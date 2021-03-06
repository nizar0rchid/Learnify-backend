const AsyncHandler = require('express-async-handler')
const Course = require('../models/Course')
const User = require('../models/User')
const Lesson = require('../models/Lesson')
const jwt = require('jsonwebtoken')


exports.new = async(req, res) => {
    try {
        //validate data as required
        _id = req.params._id
        const lesson = new Lesson();
        lesson.title = req.body.title;
        lesson.meetCode = req.body.meetCode;

        lesson.course = _id;
        try {
            lesson.support = req.file.path;
        } catch (error) {
            console.log(error)

        }


        await lesson.populate('course');
        await lesson.save();
        console.log(lesson);

        const course = await Course.findById(_id);
        course.lessons.push(lesson._id);
        await course.save();
        console.log(course);


        res.status(200).json(lesson)

    } catch (err) {
        res.status(400).json(err.message)
    }
};