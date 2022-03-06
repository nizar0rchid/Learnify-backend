const AsyncHandler = require('express-async-handler')
const Course = require('../models/Course')
const User = require('../models/User')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')


exports.new = async(req, res) => {
    try {
        //validate data as required
        _id = req.params._id
        const course = new Course();
        course.title = req.body.title;
        course.description = req.body.description;
        course.nbrSeance = req.body.nbrSeance;
        course.tag = req.body.tag;
        course.price = req.body.price;

        course.user = _id;
        if (req.files) {
            req.files.forEach(file => {
                course.support.push(file.path);
            });
        }

        await course.populate('user');
        await course.save();
        console.log(course);

        const user = await User.findById(_id);
        user.courses.push(course._id);
        await user.save();


        res.status(200).json(course)

    } catch (err) {
        res.status(400).json(err.message)
    }
};