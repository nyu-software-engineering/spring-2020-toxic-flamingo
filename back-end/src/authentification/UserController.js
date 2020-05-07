const JWT = require('jsonwebtoken');
const user = require('../models/User');
const {JWT_SECRET} = require('../configuration'); 

signToken = (user) => {
    return JWT.sign({
        iss: 'Sharmony',
        sub: user._id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate + 1) // current time + 1 day
    }, JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        
        console.log('UsersController.signUp() called!');

        let email = req.value.body.email;
        let password = req.value.body.password;
        let username = req.value.body.username;

        //check if theres a user w same email or 
        let foundEmail = await User.findOne({email: email});
        if (foundEmail) {
             return res.status(409).jon({error: 'Email is already in use'})
        }

        let foundUser = await User.findOne({username: username});
        if (foundUser) {
             return res.status(409).jon({error: 'Username is already in use'})
        }

        //create new user
        let newUser = new User({
            Email: email,
            Password: password,
            Username: username
        })
        await newUser.save();
        //generate token
        const token = signToken(ID);
        console.log(token);
        // Send a cookie containing JWT
        return res.cookie('access_token', token, {
         httpOnly: true,
        domain: "http://localhost:3000"
    })
    .status(200).json({ success: true });
    },

    logIn: async (req, res, next) => {
        //generate tokens
        console.log("log in called");
        
  const token = signToken(req.user);

  res.cookie('access_token', token, {
    httpOnly: true
  });
  res.status(200).json({ success: true });

    },

    

    secret: async (req, res, next) => {
        //generate tokens
        console.log('I managed to get here')
        res.json({secret: "resource"});
    }
}