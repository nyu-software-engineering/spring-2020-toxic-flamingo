let mongoose = require('mongoose')
//let validator = require('validator')

let postSchema = new mongoose.Schema({
  userID: String,
  postID: {
    type: String,
    unique: true, },
  hashID: Array,
  timestamp: Date,
  harmony: Boolean,
  songName: {
    type: String,
    required: true,},
  artistName: {
    type: String,
    required: true,},
  albumName: {
    type: String,
    required: true,},
  picture: {
    type: String,
    required: true,},
  spotify: {
    type: String,
    required: true,},
  comments: []
}, {collection: "PostCollection"})


module.exports = mongoose.model('Post', postSchema);