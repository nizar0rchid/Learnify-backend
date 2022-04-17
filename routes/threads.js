var express = require('express');
var router = express.Router();
const Thread = require('../models/Thread');
const path = require('path');


var threadController = require('../controllers/threadController');
router.route('/')
    .get(threadController.index);
router.route('/new/:_id')
    .post(threadController.new);
router.route('/delete/:_id')
    .delete(threadController.delete);

router.route('/:_id')
    .get(threadController.findById);

module.exports = router;