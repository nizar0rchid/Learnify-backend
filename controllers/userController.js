var bcrypt = require('bcryptjs');
const AsyncHandler = require('express-async-handler')
const User = require('../models/User')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

/* get all users*/
exports.index = async(req, res, next) => {
    User.get(function(err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
}




/*register*/
exports.regitser = async(req, res, next) => {
    try {
        // Get user input
        const { firstName, lastName, email, password, phone } = req.body;
        let initials = firstName + '+' + lastName;
        const profilePic = 'https://avatars.dicebear.com/api/initials/' + initials + '.png'

        // Validate user input
        if (!(email && password && firstName && lastName && phone)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exists. Please Login");
        }


        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            profilePic,
            phone
        });

        // Create token
        const token = jwt.sign({ user_id: user._id, email },
            process.env.TOKEN_KEY, {
                expiresIn: "30h",
            }
        );
        // save user token
        user.token = token;


        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

/* update profile pic*/
exports.pic = async(req, res) => {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        //console.log(req.file);
        user.profilePic = req.file.path
            // save the contact and check for errors
        user.save(function(err) {
            if (err)
                res.json(err);
            res.json({
                message: 'photo updated successfully',
                data: user
            });
        });
    });
};



/*update profile*/
exports.update = async(req, res) => {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        //user.phone = req.body.phone;
        //user.password = req.body.password;
        user.birthdate = req.body.birthdate;
        user.degree = req.body.degree;
        user.job = req.body.job;

        // save the contact and check for errors
        user.save(function(err) {
            if (err)
                res.json(err);
            res.json(user);
        });
    });
};

/*delete*/
exports.delete = function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'user deleted'
        });
    });
};

/*find by id*/
exports.view = function(req, res) {
    User.findById(req.params.user_id, async(err, user) => {
        if (err) {
            res.send(err);
        }

        await user.populate('courses');
        res.status(201).json(user);
    });
};


/*login*/
exports.login = async(req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(401).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({ user_id: user._id, email },
                process.env.TOKEN_KEY, {
                    expiresIn: "30h",
                }
            );

            // save user token
            user.token = token;
            user.save(function(err) {
                if (err)
                    res.json(err);
            });

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

};