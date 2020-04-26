
const bcrypt = require('bcryptjs');

let mongoose = require('mongoose')
let validator = require('validator')
const duplicatePlugin = require('./../plugins/duplicate');


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


userSchema.pre('save', async function(next) {
    try{
        //generate a salt
        const salt = await bcrypt.genSalt(10);
        //generate a password hash
        const passwordHash = bcrypt.hash(this.Password, salt);
        //reassign hashed version over original
        this.Password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isValidPassword = async function(newPassword) {
    try{
        return await bcrypt.compare(newPassword, this.Password);
    } catch (error) {
        throw new Error(error);
    }
}

userSchema.plugin(duplicatePlugin);


module.exports = mongoose.model('User', userSchema);