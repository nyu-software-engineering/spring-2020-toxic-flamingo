const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('../configuration');
const User = require('../models/User');


const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies){
        console.log('req.cookies', req.cookies);
        token = req.cookies['access_token'];
    }
}

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
        //find the user specified token
        const user = await User.findById(payload.sub);
        
        //if user no exist handle it bitch
        if (!user){
            return done(null, false);
        }
        console.log("passport using JWT Strategy");
        //otherwise return the user son
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}))


//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'username'
}, async (username, password, done) => {
    try{
        //find the user given the email
        const user = await User.findOne({username});
        //if not, handle that
        if (!user){
            return done(null, false);
        }
        //check if passport correct
        const isMatch = await user.isValidPassword(password);
        
        //if not handle that
        if (!isMatch){
            return done(null, false);
        }
        console.log("passport using local");
        //otherwise return user
        done(null, user);
     } catch (error) {
         done(error, false);
     }
}))