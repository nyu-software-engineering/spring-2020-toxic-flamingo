let mongoose = require('mongoose')
//let validator = require('validator')

let infoSchema = new mongoose.Schema({
  songName: String,
  artistName: String,
  albumName: String,
  picture: String,
  spotify: String,
  comments: Array
}, {collection: "InfoCollection"})


module.exports = mongoose.model('Info', infoSchema);