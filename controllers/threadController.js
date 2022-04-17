const AsyncHandler = require('express-async-handler')
const User = require('../models/User')
const Thread = require('../models/Thread')
const Comment = require('../models/Comment')


//get all threads
exports.index = async(req, res) => {
    try {
        const threads = await Thread.find();
        res.json(threads);
    } catch (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
};



//add a new thread
exports.new = async(req, res) => {
    try {
        //validate data as required
        _id = req.params._id
        const thread = new Thread();
        thread.title = req.body.title;
        thread.content = req.body.content;
        thread.tag = req.body.tag;
        thread.user = _id;
        thread.createdAt = new Date();

        await thread.populate('user');
        await thread.save();
        const user = await User.findById(_id);
        user.threads.push(thread._id);
        await user.save();
        res.status(201).json(thread)
    } catch (err) {
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

// allow only thread owner to delete thread
exports.delete = async(req, res) => {
    try {
        const thread = await Thread.findById(req.params._id);
        if (thread.user.toString() !== req.body.userid.toString()) {
            return res.status(401).json({
                message: 'You are not authorized to delete this thread'
            })
        }
        await thread.remove();
        res.status(200).json({
            message: 'Thread deleted successfully'
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

//find thread by id and populate the thread with its comments
exports.findById = async(req, res) => {
    try {
        const thread = await Thread.findById(req.params._id).populate('comments');
        res.json(thread);
    } catch (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
}