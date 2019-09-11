const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: String,
    comm: String
    // created: Date, jjgf
    // updated: Date
})

module.exports = mongoose.model('Comments', commentSchema);