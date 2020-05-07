let mongoose = require('mongoose')
let validator = require('validator')
const timestampPlugin = require('./../plugins/timestamp');
const duplicatePlugin = require('./../plugins/duplicate');

let commentSchema = new mongoose.Schema({
    userID: String,
    text: String,
});

commentSchema.plugin(timestampPlugin);

module.exports = mongoose.model('Comment', commentSchema);