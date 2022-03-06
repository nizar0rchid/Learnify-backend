var express = require('express');
var router = express.Router();

const Course = require('../models/Course');


const path = require('path');






var courseController = require('../controllers/courseController');
/*router.route('/')
    .get(userController.index);*/
router.route('/new/:_id')
    .post(courseController.new);
/*
router.route('/login')
    .post(userController.login)

router.route('/picture/:user_id')
    .put(upload.single('profilePic'), userController.pic);

router.route('/:user_id')
    .get(userController.view)
    .put(userController.update)
    .delete(userController.delete);
*/

module.exports = router;