// userModel.js
var mongoose = require('mongoose');
const { Schema } = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
    degree: {
        type: String,
    },
    job: {
        type: String,
    },
    profilePic: {
        type: String
    },
    token: {
        type: String
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        autopopulate: true
    }],
    subbedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        autopopulate: true
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        autopopulate: true
    }]


});
userSchema.plugin(require('mongoose-autopopulate'));
// Export Contact model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function(callback, limit) {
    User.find(callback).limit(limit);
}