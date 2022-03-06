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
        course.user = _id;
        await course.save();

        const user = await User.findById(_id);
        user.courses.push(course._id);
        await user.save();

        //return new book object, after saving it to Publisher
        res.status(200).json(course)

    } catch (err) {
        res.status(400).json(err.message)
    }
};