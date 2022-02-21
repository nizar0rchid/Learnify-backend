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
    birthdate: {
        type: Date,
        required: true
    },
    degree: {
        type: String,
        required: true
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


});
// Export Contact model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function(callback, limit) {
    User.find(callback).limit(limit);
}