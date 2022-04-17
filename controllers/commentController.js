const AsyncHandler = require('express-async-handler')
const User = require('../models/User')
const Thread = require('../models/Thread')
const Comment = require('../models/Comment')




//add comment to a thread
exports.addComment = async(req, res) => {
    try {
        //validate data as required
        const comment = new Comment();
        comment.content = req.body.content;
        comment.user = req.body.userid;
        comment.thread = req.body.threadid;
        comment.createdAt = new Date();
        await comment.save();
        const thread = await Thread.findById(req.body.threadid);
        thread.comments.push(comment._id);
        await thread.save();
        res.status(201).json(comment)
    } catch (err) {
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

//allow only comment oweer to delete comment
exports.deleteComment = async(req, res) => {
    try {
        const comment = await Comment.findById(req.params._id);
        if (comment.user.toString() !== req.body.userid.toString()) {
            return res.status(401).json({
                message: 'You are not authorized to delete this comment'
            })
        }
        await comment.remove();
        res.status(200).json({
            message: 'Comment deleted successfully'
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).json(err.message)
    }
}