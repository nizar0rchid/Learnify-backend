require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
const fileUpload = require("express-fileupload");
const faceApiService = require("./faceapiService");
const User = require('./models/User')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var lessonsRouter = require('./routes/lessons');
var threadsRouter = require('./routes/threads');
var commentsRouter = require('./routes/comments');


/////////////////////////////////////////


////////////////////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(fileUpload());


// post request to check user face expressions after sending a photo
app.post("/faceapi/:user_id", async(req, res) => {
    try {


        const { file } = req.files;

        const result = await faceApiService.detect(file.data, file.name);
        let neutral = parseFloat(result["0"]["expressions"].neutral);
        let happy = parseFloat(result["0"]["expressions"].happy);
        let sad = parseFloat(result["0"]["expressions"].sad);
        let surprise = parseFloat(result["0"]["expressions"].surprise);
        let anger = parseFloat(result["0"]["expressions"].anger);
        let fear = parseFloat(result["0"]["expressions"].fear);
        let disgust = parseFloat(result["0"]["expressions"].disgust);

        let results = []
        results.push(neutral, happy, sad, surprise, anger, fear, disgust);

        const needle = 1;
        const closest = results.reduce((a, b) => {
            return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
        });

        let experssion;

        if (closest == neutral) {
            experssion = "Neutral";
        } else if (closest == happy) {
            experssion = "Happy";
        } else if (closest == sad) {
            experssion = "Sad";
        } else if (closest == surprise) {
            experssion = "Surprise";
        } else if (closest == anger) {
            experssion = "Anger";
        } else if (closest == fear) {
            experssion = "Fear";
        } else if (closest == disgust) {
            experssion = "Disgust";
        }
        User.findById(req.params.user_id, async(err, user) => {
            if (err) {
                res.send(err);
            }
            let url = ''
            console.log("************************************************")
            console.log("User: ", user.firstName + " " + user.lastName);
            console.log("Happy: ", happy);
            console.log("Sad: ", sad);
            console.log("Surprise: ", surprise);
            console.log("Anger: ", anger);
            console.log("Fear: ", fear);
            console.log("Disgust: ", disgust);
            console.log("Neutral: ", neutral);
            console.log("Expression: ", experssion);
            console.log("Certainty: ", closest);
            console.log("url: http://localhost:3000/out/" + file.name);
            console.log("************************************************")
            res.status(200).json({
                user: user,
                expression: experssion,
                certainty: closest,
                url: `http://localhost:3000/out/${file.name}`,
            });
        });
    } catch (error) {
        console.log(error);
        console.log("Photo not recognized");
        res.status(406).json("Photo not recognized");
    }

});


var dburl = process.env.DB

mongoose.connect(dburl, { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/lessons', lessonsRouter);
app.use('/threads', threadsRouter);
app.use('/comments', commentsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;