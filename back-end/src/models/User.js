let mongoose = require('mongoose')
//let validator = require('validator')
let trophy = require('./Trophy.js')
let userSchema = new mongoose.Schema({
  userID: String,
  Username: String,
  Password: String,
  Email: String,  
  Bio: String,
  Profile_Pic: String,
  Trophies: [trophy],
  Harmonies_id: Array
}, {collection: "UserCollection"})

module.exports = mongoose.model('User', userSchema);