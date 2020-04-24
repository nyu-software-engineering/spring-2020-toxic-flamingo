let mongoose = require('mongoose')
//let validator = require('validator')

let followSchema = new mongoose.Schema({
  userID: String,
  follower: Array,
  following: Array
}, {collection: "FollowCollection"})

module.exports = mongoose.model('Follow', followSchema);