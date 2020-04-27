let mongoose = require('mongoose')
let validator = require('validator')
const timestampPlugin = require('./../plugins/timestamp');
const duplicatePlugin = require('./../plugins/duplicate');
const commentModel = require('./Comment');


let postSchema = new mongoose.Schema({
  userID: String,
  postID: {
    type: String,
    unique: true, },
  hashID: Array,
  harmony: Boolean,
  songName: {
    type: String,
    required: true,},
  artistName: {
    type: Array,
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
  description: String,
  comments: [commentModel.schema]
}, {collection: "PostCollection"})

postSchema.plugin(timestampPlugin);
postSchema.plugin(duplicatePlugin);

module.exports = mongoose.model('Post', postSchema);