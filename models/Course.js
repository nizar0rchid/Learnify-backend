var mongoose = require('mongoose');
const { Schema } = require('mongoose');
// Setup schema
var courseSchema = mongoose.Schema({
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    nbrSeance: {
        type: Number
    },
    tag: {
        type: String
    },
    price: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    lessons: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'lesson' }
    ]



});
// Export Contact model
var Course = module.exports = mongoose.model('course', courseSchema);
module.exports.get = function(callback, limit) {
    Course.find(callback).limit(limit);
}