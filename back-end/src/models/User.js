let mongoose = require('mongoose')
//let validator = require('validator')

let userSchema = new mongoose.Schema({
  userID: String,
  Username: String,
  Password: String,
  Email: String,  
  Bio: String,
  Profile_Pic: String,
  Trophies: Array
}, {collection: "UserCollection"})

module.exports = mongoose.model('User', userSchema);