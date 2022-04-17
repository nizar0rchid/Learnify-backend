var mongoose = require('mongoose');
const { Schema } = require('mongoose');
// Setup schema
var threadSchema = mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date
    },
    tag: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    }]



});
threadSchema.plugin(require('mongoose-autopopulate'));

// Export Contact model
var Thread = module.exports = mongoose.model('thread', threadSchema);
module.exports.get = function(callback, limit) {
    Thread.find(callback).limit(limit);
}