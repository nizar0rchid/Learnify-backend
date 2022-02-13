var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../firebase.json");
const User = require('../models/User');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://learnify-49d5a-default-rtdb.europe-west1.firebasedatabase.app"
});


const db = admin.firestore();


/* GET users listing. */
router.get('/', async(req, res, next) => {
    try {
        const users = await db.collection("users");
        const data = await users.get();
        const arr = [];
        if (data.empty) {
            res.status(400).json({ message: "No records found" });
        } else {
            data.forEach((item) => {
                const users = new User(
                    item.data().uid,
                    item.data().email,
                    item.data().password,
                    item.data().username
                );
                arr.push(users);
            });
            res.status(200).json(arr);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


/*add user*/
router.post('/', async(req, res, next) => {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
        await db.collection("users").doc(req.body.username).set(data);
        res.status(201).json({ message: "Record saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;