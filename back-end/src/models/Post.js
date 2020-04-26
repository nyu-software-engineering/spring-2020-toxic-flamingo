let mongoose = require('mongoose')
//let validator = require('validator')

let postSchema = new mongoose.Schema({
  userID: String,
  postID: String,
  hashID: Array,
  harmony: Boolean,
  songName: String,
  artistName: String,
  albumName: String,
  picture: String,
  spotify: String,
  comments: []
}, {collection: "PostCollection"})


module.exports = mongoose.model('Post', postSchema);