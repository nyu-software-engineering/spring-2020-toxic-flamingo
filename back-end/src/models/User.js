
const bcrypt = require('bcryptjs');

let mongoose = require('mongoose')
let validator = require('validator')
const duplicatePlugin = require('./../plugins/duplicate');


let userSchema = new mongoose.Schema({
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


// userSchema.pre('save', async function(next) {
//     const SALTROUNDS = 10;
//     const user = this;
//     try{
//         console.log('entered');
//     //if (!this.methods.includes('local')) {
//       //next();
//     //}
//     //the user schema is instantiated
    
//     //check if the user has been modified to know if the password has already been hashed
//     if (!user.isModified('password')) {
//       next();
//     }

//     bcrypt
//         .genSalt(SALTROUNDS)
//         .then(salt =>{
//             console.log(`Salt: ${salt}`)

//             return bcrypt.hash(user.Password, salt);
//         })
//         .then(hash => {
//             console.log(`Hash: ${hash}`);
        
//             // Store hash in your password DB.
//         })
//         .catch(err => console.error(err.message));
 

//         //generate a salt
//         // const salt = await bcrypt.genSalt(10);
//         // //generate a password hash
//         // const passwordHash = bcrypt.hash(user.Password, salt);
//         // console.log(user.Password)
//         // console.log(passwordHash);
//         // // Re-assign hashed version over original, plain text password
//         // user.local.password = passwordHash;
//         // console.log(user.local.password);
//         // console.log('exited');
//         //next();
//     } catch (error) {
//         console.log("I caught an error!");
//         next(error);
//     }
// })

userSchema.methods.isValidPassword = async function(newPassword) {
    try{
        console.log(newPassword)
        console.log(this.Password)
        return await bcrypt.compare(newPassword, this.Password);
        
    } catch (error) {
        throw new Error(error);
    }
}

userSchema.plugin(duplicatePlugin);


module.exports = mongoose.model('User', userSchema);