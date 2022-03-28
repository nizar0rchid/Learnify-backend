var mongoose = require('mongoose');
const { Schema } = require('mongoose');
// Setup schema
var lessonSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    support: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    meetCode: {
        type: String,
    }


});
// Export Contact model
var Lesson = module.exports = mongoose.model('lesson', lessonSchema);
module.exports.get = function(callback, limit) {
    Course.find(callback).limit(limit);
}