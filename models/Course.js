var mongoose = require('mongoose');
const { Schema } = require('mongoose');
// Setup schema
var courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }


});
// Export Contact model
var Course = module.exports = mongoose.model('course', courseSchema);
module.exports.get = function(callback, limit) {
    Course.find(callback).limit(limit);
}