let mongoose = require('mongoose')
let validator = require('validator')

let userSchema = new mongoose.Schema({
  userID: {
      type: String,
      unique: true, },
  Username: {
      type: String,
      required: true,
      unique: true, },
  Password: {
      type: String,
      required: true },
  Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
          return validator.isEmail(value)
        }},
  Bio: String,
  Profile_Pic: String,
  Trophies: Array,
  follower: Array,
  following: Array
}, {collection: "UserCollection"})

module.exports = mongoose.model('User', userSchema);