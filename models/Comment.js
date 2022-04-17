var mongoose = require('mongoose');
const { Schema } = require('mongoose');
// Setup schema
var commentSchema = mongoose.Schema({
    content: {
        type: String
    },
    createdAt: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: true
    },
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: true
    },

});
commentSchema.plugin(require('mongoose-autopopulate'));

// Export Contact model
var Comment = module.exports = mongoose.model('comment', commentSchema);
module.exports.get = function(callback, limit) {
    Comment.find(callback).limit(limit);
}