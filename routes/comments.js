var express = require('express');
var router = express.Router();
const Comment = require('../models/Comment');
const path = require('path');


var commentController = require('../controllers/commentController');

router.route('/new')
    .post(commentController.addComment);
router.route('/delete/:_id')
    .delete(commentController.deleteComment);

module.exports = router;