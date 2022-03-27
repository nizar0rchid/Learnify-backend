var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const User = require('../models/User');

const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
})






var userController = require('../controllers/userController');
router.route('/')
    .get(userController.index);
router.route('/register')
    .post(upload.single('profilePic'), userController.regitser);

router.route('/login')
    .post(userController.login)

router.route('/picture/:user_id')
    .put(upload.single('profilePic'), userController.pic);

router.route('/:user_id')
    .get(userController.view)
    .put(userController.update)
    .delete(userController.delete);

router.route('/courses/:user_id')
    .post(userController.sub)
    .get(userController.getCourses);

router.route('/subbedcourses/:user_id')
    .get(userController.getSubbedCourses);

module.exports = router;