var express = require('express');
var router = express.Router();
const Course = require('../models/Course');
const path = require('path');
var multer = require('multer');


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/uploads/lessons')
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})







var courseController = require('../controllers/courseController');
router.route('/')
    .get(courseController.index);
router.route('/new/:_id')
    .post(upload.single('image'), courseController.new);
router.route('/lessons/:_id')
    .get(courseController.view);
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