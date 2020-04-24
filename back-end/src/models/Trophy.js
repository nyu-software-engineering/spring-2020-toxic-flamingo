let mongoose = require('mongoose')
//let validator = require('validator')

let trophySchema = new mongoose.Schema({
  achievement: String,
  accomplish: Boolean
}, {collection: "trophyCollection"})

module.exports = mongoose.model('Trophy', trophySchema);