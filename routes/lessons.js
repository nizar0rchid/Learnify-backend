var express = require('express');
var router = express.Router();
const Course = require('../models/Lesson');
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



var lessonController = require('../controllers/lessonController');
/*router.route('/')
    .get(userController.index);*/
router.route('/new/:_id')
    .post(upload.single('support'), lessonController.new);
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