let mongoose = require('mongoose')

let tagSchema = mongoose.Schema({
    tag: String,
    posts: [String]

}, {collection: "TagCollection"});

module.exports = mongoose.model('Tag', tagSchema);