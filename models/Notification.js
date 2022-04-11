var mongoose = require('mongoose');
const { Schema } = require('mongoose');
// Setup schema
var notificationSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


// Export Contact model
var Notification = module.exports = mongoose.model('notification', notificationSchema);
module.exports.get = function(callback, limit) {
    Course.find(callback).limit(limit);
}