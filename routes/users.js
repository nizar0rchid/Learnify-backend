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
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})



var userController = require('../controllers/userController');
router.route('/register')
    .post(upload.single('profilePic'), userController.regitser);

router.route('/login')
    .post(userController.login)

router.route('/pic/:user_id')
    .put(upload.single('profilePic'), userController.pic);

router.route('/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .delete(userController.delete);


module.exports = router;