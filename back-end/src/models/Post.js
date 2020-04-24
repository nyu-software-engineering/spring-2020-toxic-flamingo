let mongoose = require('mongoose')
//let validator = require('validator')
let infoschema = require('./Info.js')

let postSchema = new mongoose.Schema({
  userID: String,
  hashID: String,
  harmonyID: String,
  info: [infoschema]
}, {collection: "PostCollection"})


module.exports = mongoose.model('Post', postSchema);