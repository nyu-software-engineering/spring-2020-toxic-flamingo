// import and instantiate express
const axios = require("axios");
const express = require("express"); // CommonJS import style!
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express(); // instantiate an Express object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
const request = require("request");
const querystring = require('querystring');
let mongoose = require('mongoose');
let db = require('./src/database.js');
let userModel = require('./src/models/User.js');
let postModel = require('./src/models/Post.js');
let commentModel = require('./src/models/Comment');
let notificationModel = require('./src/models/Notification');
let tagModel = require('./src/models/Tag');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require("cors")
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('./src/configuration'); 
const passport = require('passport');
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const jwtDecode = require('jwt-decode');
const corsOptions = {
  origin: "http://localhost:3000",    // reqexp will match all prefixes
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true,                // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
}
// intercept pre-flight check for all routes
//app.options('*', cors(corsOptions))
app.use(cors(corsOptions));
//app.use(require('serve-static')(__dirname + '/../../public'));
//app.use(require('cookie-parser')());
//app.use(require('body-parser').urlencoded({ extended: true }));
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
//require('./src/authentication/passport')(passport);
//const passportSignIn = passport.authenticate('local', { session: false });

// Pass a secret to sign the secured http cookie
app.use(cookieParser(JWT_SECRET));

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies){
      //console.log('req.cookies', req.cookies);
      token = req.cookies['access_token'];
      //console.log("token received: " + token);
  }
  return token;
}

var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = 'sharmonyauthentification';

const cookieToID = req => {
  let token = cookieExtractor(req);
  console.log(token);

  let decodedToken = jwtDecode(token);
  let userID = decodedToken.sub;

  return userID;
}

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy(opts, async(payload, done) => {
  
  try {
      console.log("what up");
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
      console.log('we got an error folks');
      done(error, false);
  }
}))

passport.use(new LocalStrategy({
  usernameField: 'username'
}, async (username, password, done) => {
  try{
      //find the user given the 
      const user = await userModel.findOne({Username: username});
      //if not, handle that
      if (!user){
          console.log("hello");
          return done(null, false);
      }
      //check if passport correct
      const isMatch = await user.isValidPassword(password);
      
      //if not handle that
      if (!isMatch){
          console.log("hello2");
          return done(null, false);
      }
      console.log("passport using local");
      //otherwise return user
      done(null, user);
   } catch (error) {
      console.log("hello3");
       done(error, false);
   }
}))

signToken = (user_id) => {
    return JWT.sign({
        iss: 'Sharmony',
        sub: user_id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate + 1) // current time + 1 day
    }, JWT_SECRET)
}
////////////////////////////////////
populateTrophies = () => {
  let trophies = [];
  const x = {
    title: 'Harmonize',
    description: 'Get your first Harmony!',
    icon: '',
    hidden: true
    
};
}
//////////////////////////////////////
app.post("/signUp", cors(corsOptions), async (req, res, next) => {
  //console.log(req.header("cookie"));      
  console.log('UsersController.signUp() called!');
  //console.log(req);
  let data = req.body;
  //console.log(data);

  let email = data.email;
  let password = data.password;
  let username = data.username;
  console.log("email:" + email);
  console.log("password:" + password);
  console.log("username:" + username);

  //check if theres a user w same email or 
  let foundEmail = await userModel.findOne({email: email});
  if (foundEmail) {
       return res.status(409).json({error: 'Email is already in use'})
  }

  let foundUser = await userModel.findOne({username: username});
  if (foundUser) {
       return res.status(409).json({error: 'Username is already in use'})
  }

  //create new user
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash) {
      console.log("Hash:" + hash);
      let newUser = new userModel({
          Email: email,
          Password: hash,
          Username: username,
          Bio: "I'm new here",
          Profile_Pic: "https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg",
          Trophies: [],
          follower: [],
          following: []
      })
      let ID;
      await newUser.save()
        .then(doc => {
          ID = doc._id
          console.log(ID)});
      //generate token
      const token = signToken(ID);
      console.log(token);
      // Send a cookie containing JWT
      return res.cookie('access_token', token, {
          httpOnly: true,
          //domain: "http://localhost:3000"
        })
        .status(200).json({ success: true });
      })
    });
  });
  
 

app.post("/logIn", passport.authenticate('local', {session: false, 
failureFlash: true }), async (req, res, next) => {
  //generate tokens
  console.log("log in called");
  console.log("before " + req.body.username);
  
  const username = req.body.username;
  console.log("after " + req.body.username);
  const user = await userModel.findOne({Username: username});
  //if not, handle that
  if (!user){
    console.log("no user");
      return;
  }

  const id = user._id;
  console.log(id);
  const token = signToken(id);

  res.cookie('access_token', token, {
    httpOnly: true
  });
  res.status(200).json({ success: true });


});


app.get("/status", async (req, res, next) => {
  let token = cookieExtractor(req);
  console.log(token);

  if (token != null) {
    let decodedToken = jwtDecode(token);
    console.log("good token");

    let userID = decodedToken.sub;
    let profPic;
    await userModel.findById(userID)
      .then(doc => {
        profPic = doc.Profile_Pic;

      })
      .catch(err => {
        console.log(err);
      });

    res.json({decodedToken,profPic});
  }
  else {
    console.log("token = " + token);
    res.json(token);
  }

  
});

app.get("/signOut", async (req, res, next) => {
  res.clearCookie('access_token');
  console.log('I managed to get here!');
  res.status(200).json({ success: true });
});

app.get("/isPersonal/:theirID", async (req, res, next) => {
  console.log('got here!');
  const theirID = req.params.theirID;
  const yourID = cookieToID(req);
  if (theirID == yourID){
    console.log("match");
    res.json(true);
  } else {
    console.log(theirID);
    console.log(yourID);
    res.json(false);
  }
})

app.get("/", (req, res) => {
    res.send("Hello!");
  });

//mock users data
const users = [
  {
    id: 1,
    username: "kanyelover70",
    pic: "https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg",
    name: "Kanye Fan",
    bio: "Welcome to the good life, the life i live!",
    followers: 200,
    following: 265,
    coverarts: "https://www.mockaroo.com/schemas/226537"
  },
  {
    id: 2,
    username: "kanyehater20",
    pic: "https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg",
    name: "Kanye Hater",
    bio: "If I could I'd become a cow and eat grass daily",
    followers: 2000,
    following: 154,
    coverarts: "https://www.mockaroo.com/schemas/226537"
  }
];


app.get("/user/:isPersonal/:userID", async (req, res) => {
    let userID;
    let isPersonal = req.params.isPersonal;
    if(isPersonal == "false") {
      userID = req.params.userID;
      console.log("Not a personal profile");
    }
    else if (isPersonal == "true"){
      userID = cookieToID(req);
      console.log("this is my profile b");
    }
    let username, bio, pic, follower, following;
    let isFollowing = true;
    await userModel.findById(userID)
    .then(doc => {
      username = doc.Username;
      console.log(username);
      bio = doc.Bio;
      pic = doc.Profile_Pic;
      follower = doc.follower;
      following = doc.following;
      if (follower.filter(follower => 
        follower.toString() === cookieToID(req) ).length == 0){
          isFollowing = false;
        } 
    })
    .catch(err => {
      console.log(err);
    });
    res.json({
      id: userID,
      username: username,
      bio: bio,
      pic: pic,
      follower: follower,
      following: following,
      isFollowing: isFollowing,
    })
  })

app.get("/profileposts/:userID", async (req,res) => {
  const userID = req.params.userID;
  let response;
  await postModel.find({'userID': userID})
  .sort({createdAt: -1})
  .then(postArray => {
    response = postArray;
    console.log(postArray);
  }).catch(err => {
    console.log(err);
  });
  res.json(response);
});



app.get("/Followee/:userID", async (req, res) => {
  let userID = req.params.userID;
  let following;
  await userModel.findById(userID)
  .then(doc => {
    following = doc.following;
  })
  .catch(err => {
    console.log(err);
  });
  res.json(following)
})

app.get("/Follower/:userID", async (req, res) => {
  let userID = req.params.userID;
  let follower;
  await userModel.findById(userID)
  .then(doc => {
    follower = doc.follower;
  })
  .catch(err => {
    console.log(err);
  });
  res.json(follower)
})

app.get("/Search/:searchUsers/:searchQuery", async (req, res) => {
  //const user  = req.params.userid;

  const searchUsers = req.params.searchUsers;
  const searchQuery = req.params.searchQuery.trim();

  console.log(searchUsers + " " + searchQuery);

  if (searchUsers == 'true') {
    console.log("looking for user " + searchQuery);
    userModel.find(
      { "Username": { "$regex": searchQuery, "$options": "i" } }
    )
    .then(result => {
      console.log(result);
      res.json(result)
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    console.log("looking for tag " + searchQuery);
    tagModel.find(
      { "tag": { "$regex": searchQuery, "$options": "i" }}
    )
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

});

 function getProfilePosts(userID){
   let posts = [];
  console.log(userID);
   posts.push(users[userID].coverarts);
  return posts;
 }


app.get("/Notifications", async (req, res) => {
  let myid = cookieToID(req);
  console.log('where is THIS???????????????????????????????????/');
  console.log(myid);
  notificationModel.find({ userID : myid})
  .sort({'createdAt': 'desc'})
  .limit(10)
  .then(result => {
    console.log(result);
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  })
  //const user  = req.params.userid;
})

app.get("/Harmonies/:userID", async (req, res) => {
  
  const userID = req.params.userID;

  
  postModel.find({ 'userID':  userID , 'harmony': true})
  .sort({createdAt: -1})
  .then(result => {
    console.log(result);
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  })

})

app.get("/followThisGuy/:userID", async (req,res) => {
  console.log("hello i clicked follow button");

  let tryingToFollow = req.params.userID;
  let myID = cookieToID(req);

  if (tryingToFollow === myID){
    return res.status(400).json({ alreadyfollow : "You cannot follow yourself"});
  }
  
  await userModel.findById(tryingToFollow)
    .then(user => {
      let name;
      console.log(user.follower);
      console.log(myID);
      userModel.findById(myID)
      .then( doc => {
      name = doc.Username;
      //notification update
      let newNotification = new notificationModel({
        userID: tryingToFollow,
        text: `${name} started following me!`
      })
      newNotification.save({runValidators:true}).then(doc => {
        console.log('created follower notification');
        }).catch(err => {
        console.log(err);
       }); 
      })
      .catch(err => {console.log(err);})
      


      if (user.follower.filter(follower => 
        follower.toString() === myID ).length == 0){
      userModel.findByIdAndUpdate(tryingToFollow,{$push: {follower: myID}},
        {
          new : true,
          runValidators: true
        })
        .then(doc => {
          console.log('did this go thru?????????!!!!!!');
          console.log(doc);
          let yes = updateFollowing(myID,tryingToFollow);
          return res.status(200).json({success: {yes}});
        }).catch(err => {
          console.log(err);
        })
      } else {
        console.log('you follow them already');
        return res.status(400).json({ success: false });
      }
   
    })  
    .catch(err => {
      console.log('theres an error trying to add me to follower list');
      console.log(err);
    });
})

const updateFollowing = async (myID, tryingToFollow) =>{
  await userModel.findByIdAndUpdate(myID,{$push: {following: tryingToFollow}},
    {
      new : true,
      runValidators: true
    })
    .then(doc => {
      console.log('did this go thru?????????!!!!!!');
      console.log(doc);
      return true;
    }).catch(err => {
      console.log(err);
    })
}

app.get("/unfollowThisGuy/:userID", async (req,res) => {
  console.log("hello i clicked UNFollow button");

  let tryingToUnfollow = req.params.userID;
  let myID = cookieToID(req);

  if (tryingToUnfollow === myID){
    return res.status(400).json({ alreadyunfollow : "You cannot unfollow yourself"});
  }
  
  await userModel.findById(tryingToUnfollow)
    .then(user => {
      console.log(user.follower);
      console.log(myID);
      if (user.follower.filter(follower => 
        follower.toString() === myID ).length > 0){
      userModel.findByIdAndUpdate(tryingToUnfollow,{$pull: {follower: myID}},
        {
          new : true,
          runValidators: true
        })
        .then(doc => {
          console.log('did this go thru?????????!!!!!!');
          console.log(doc);
          let yes = updateUnfollowing(myID,tryingToUnfollow);
          return res.status(200).json({success: {yes}});
        }).catch(err => {
          console.log(err);
        })
      } else {
        console.log('youve unfollowed them already');
        return res.status(400).json({ success: false });
      }
   
    })  
    .catch(err => {
      console.log('theres an error trying to add me to follower list');
      console.log(err);
    }); 
})

const updateUnfollowing = async (myID, tryingToUnfollow) =>{
  await userModel.findByIdAndUpdate(myID,{$pull: {following: tryingToUnfollow}},
    {
      new : true,
      runValidators: true
    })
    .then(doc => {
      console.log('did this go thru?????????!!!!!!');
      console.log(doc);
      return true;
    }).catch(err => {
      console.log(err);
    })
}

app.get('/refresh_token', function(req, res) {
  let refresh_token = req.query.refresh_token;
  let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers:{ 'Authorization': 'Basic ' + (new Buffer('691936c2acfc4bad82db2fe642f023ec' + ':' + '2907a5de299c4052a6f9b3f738030a7a').toString('base64')) },
      form:{
          grant_type: 'refresh_token',
          refresh_token: refresh_token
      },
      json: true
  };
})
app.get('/Make_Post/:search', function(req, res, next){
  const client_id = '691936c2acfc4bad82db2fe642f023ec'; // Your client id
  const client_secret = '2907a5de299c4052a6f9b3f738030a7a'; // Your secret
  let search = req.params.search;
  // your application requests authorization
  let authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    let url = `https://api.spotify.com/v1/search?q=${search}&type=track`
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log("TRACK DATA!!!!!!!!!!!!!!!!!!!!!");
      //console.log(body.tracks.items);
      console.log(body.tracks.items[0].album.images);
      //console.log(body.artists.items);
      res.json(body);
      //res.redirect(querystring.stringify(body), 'http://localhost:3000/Make_Post');
    });
    
    //let uri = process.env.FRONTEND_URI || 'http://localhost:3000/Make_Post'
    //res.redirect(uri)
  }
});
});

//post request for submitting a comment
app.post("/submitComment/:comment/:userID/:postID", async (req, res) => {

    const comment = req.params.comment;
    const userID = cookieToID(req);
    const postID = req.params.postID;
    let writer;
    let id;
    // notification 
   await userModel.findById(userID)
    .then( doc => {
    writer = doc.Username;
    })
    .catch(err => {console.log(err);})
    await postModel.findById(postID)
    .then(doc => {
      id = doc.userID
      let newNotification = new notificationModel({
        userID: id,
        text: `${writer} posted a comment on your post!`
      })
      newNotification.save({runValidators:true}).then(doc => {
        console.log('created comment notification');
        }).catch(err => {
        console.log(err);
    })
    .catch(err => {console.log(err);})
    })




    let commentToSubmit = new commentModel({
      userID: userID,
      text: comment
    });

    let username = "";

    await userModel.findById(userID)
    .then(doc => {
      username = doc.Username;
    })
    .catch(err => {
      console.log(err);
    });

    await postModel.updateOne(
      {_id: postID},
      {$push: {comments: commentToSubmit}}
    )
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
    

    res.send("hey!");
});



//load comments for a particular post
app.get('/loadComments/:postId', async (req, res) => {

    const postID = req.params.postId;

    let comments = [];
    let formattedComments = [];

    await postModel.findById(postID)
      .then(doc => {
        
        comments = doc.comments;
        console.log(doc.comments);
      })
      .catch(err => {
        console.log(err);
      });

    for (let i=0; i < comments.length; i++) {
      let comment = comments[i];

      await userModel.findById(comment.userID)
      .then(doc => {
        formattedComments.push({
          userID: comment.userID,
          username: doc.Username,
          text: comment.text,
          timestamp: comment.createdAt
        })
      })
      .catch(err => {
        console.log(err);
      });
    }

    res.json(formattedComments);
});

app.get('/loadPost/:postID', async (req, res) => {

  const postID = req.params.postID;

  let post;

  console.log(postID);

  await postModel.findById(postID)
  .then(doc => {
    post = doc;
  })
  .catch(err => {
    console.log(err);
  });

  res.json(post);

});




// load a main feed of only followed users' posts
app.get('/mainFeed/', async (req, res) => {

  const userID = cookieToID(req);

  let following = [];

  await userModel.findById(userID)
    .then(doc => {
      if (doc.following) {

        console.log(doc.following);

        following = doc.following;
      }
      following.push(userID);
    })
    .catch(err => {
      console.log(err);
    });

  postModel.find({
    'userID': { $in: following.map((id, i) => {
      return mongoose.Types.ObjectId(id);
    })},
  })
  .sort({createdAt: -1})
  .then(result => {
    console.log(result);
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  })

  // let response = await axios.get("https://api.mockaroo.com/api/0abb6050?count=20&key=ffab93f0");

  // // this logic would assumedly be taken care of in the eventual database queries
  // let followedPosts = [];
  // let data = response.data;
  // for (let i=0; i<data.length; i++) {
  //   const post = data[i];
  //   if (followedUsers.includes(post.username)) followedPosts.push(post);
  // }
  // res.json(followedPosts);
});

app.get('/trophies/', async (req, res) => {
  let trophy;
  const userID = cookieToID(req);
  await userModel.findById(userID)
  .then(doc => {
    trophy  = doc.Trophies;

  })
  .catch(err => {
    console.log(err);
  });
  
  res.json(trophy);
});

// load and filter a feed based on a hashtag
app.get('/hashtagFeed/:hashtag', async (req, res) => {

  const hashtag = req.params.hashtag; 

  console.log("hashtag = " + hashtag);

  postModel.find({
    'hashID': "#"+hashtag,
  })
  .sort({createdAt: -1})
  .then(result => {
    console.log(result);
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  })

});

app.post("/changeProfilePic/", (req, res) => {
  console.log("gothere");
  const profPic = req.body.profPic;
  console.log(profPic);
  const uID = cookieToID(req);
  console.log(uID);
  userModel.findByIdAndUpdate(uID,{Profile_Pic: profPic}, 
  {
    new : true,
    runValidators: true
  }).then(doc => {
    console.log(doc);
  }).catch(err => {
    console.log(err);
  })
  });

  app.post("/changeBio/", (req, res) => {
    console.log("gothere");
    const bio = req.body.userBio;
    console.log(bio);
    const uID = cookieToID(req);
    console.log(uID);
    userModel.findByIdAndUpdate(uID,{Bio: bio}, 
    {
      new : true,
      runValidators: true
    }).then(doc => {
      console.log(doc);
    }).catch(err => {
      console.log(err);
    })
    });

app.post("/changeEmail/", (req, res) => {
  let data = req.body;
  const email = data.email;
  console.log(email);
  const uID = cookieToID(req);
  console.log(uID);
  userModel.findByIdAndUpdate(uID,{Email: email}, 
  {
    new : true,
    runValidators: true
  }).then(doc => {
    console.log(doc);
  }).catch(err => {
    console.log(err);
  })
  });

app.post("/changePassword/", async (req, res) => {
  let data = req.body;
  console.log(data);
  const oldPass = data.oldPassword;
  const newPass = data.newPassword;
  const uID = cookieToID(req);
  console.log(oldPass);
  console.log(newPass);
  console.log(uID);
  const user = await userModel.findById(uID);
  const isMatch = await user.isValidPassword(oldPass);
  if (isMatch) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newPass, salt, async function(err, hash) {
        userModel.findByIdAndUpdate(uID,{Password: hash},
        {
          new : true,
          runValidators: true
        }).then(doc => {
          console.log(doc);
          res.status(200).json("Success!");
        }).catch(err => {
          console.log(err);
        })
      })
    })
  } else {
    console.log("incorrect current password");
    res.status(401).json("Incorrect Current Password");
  }
});

app.post("/createPost/", async (req,res) => {
  const userID = cookieToID(req);
  let username;
  await userModel.findById(userID)
    .then(doc => {
      username = doc.Username;
    })
    .catch(err => {
      console.log(err);
    });
  let data = req.body
  console.log(req.body)
  //data = JSON.parse(data)
  //console.log(data.hashID);

  //search for harmony here if there is previous post with same song - songname and artist

  if (data.spotify == null) {
    console.log("NO LINK");
    data.spotify = "#";
  }
  //checks if the song exists or not then makes a harmony
  let isHarmony = true;
  await postModel.find({ songName: data.songName , artistName: data.artistName}, function(err, result) {
    if (err) {
      console.log('there was an error');
    } else {
      console.log('the result is' + result);
      if (result.length > 0){
        isHarmony = false;
      }
    }
  });
  console.log('i just searched for this song');
  
  if(isHarmony === true){
    let newNotification = new notificationModel({
      userID: userID,
      text: `Harmony Achieved!`
    })
    newNotification.save({runValidators:true}).then(doc => {
      console.log('created harmony notification');
      }).catch(err => {
      console.log(err);
     }); 
  }

  userModel.findByIdAndUpdate(userID,{$set: {[`Trophies.${0}`]: true} },
    {
      new : true,
      runValidators: true
    }    
  )
  .then(doc => {
    console.log('trophy testesetsetsetsetsetsetsetsets');
    console.log(doc);
  }).catch(err => {
    console.log(err);
  });

  let newPost = new postModel({
    userID: cookieToID(req),
    hashID: data.hashID,
    harmony: isHarmony, 
    songName: data.songName,
    artistName: data.artistName,
    albumName: data.albumName,
    picture: data.picture,
    spotify: data.spotify,
    description: data.description,
    comments: [{user:'godddamnit'}]//data.comments
  });

  let postID = "";
  //post data and send it to monodb atlas here 
  await newPost.save({runValidators:true}).then(doc => {
      console.log('this is pushing data to DB')
      postID = doc._id;
      }).catch(err => {
      console.log(err);
      });

  res.status(200).json({ success: true });    
  //search for harmony here if there is previous post with same song - songname and artist
  //get post data and send it to monodb atlas here 


  let tags = data.hashID;
    
  for (let i=0; i < tags.length; i++) {
    let tag = tags[i].replace("#", "");
    
    await tagModel.findOne(
      {tag: tag}
    )
    .then(doc => {
      
      if (doc == null) {
        let newTag = new tagModel({
          posts: [postID],
          tag: tag
        })
        newTag.save({runValidators:true})
        .then(doc => {
          console.log("logged the tag");
        })
        .catch(err => {
          console.log("failed to log tag");
        }) 
      }
      else {
        doc.updateOne(
          {$push: {posts: postID}}
        )
        .then(doc => {
          console.log("updated? " + doc)
        })
        .catch(err => {
          console.log("failed to update: " + err);
        })
      }

    })
    .catch(err => {
      console.log("ERROR: " + err);
    })
  }
 
})

app.get("/getUsername/:userID", async (req, res, next) => {
  console.log(req.params.userID);
  const userID = req.params.userID;
  let username;
  await userModel.findById(userID)
    .then(doc => {
      username = doc.Username;
    })
    .catch(err => {
      console.log(err);
    });
    console.log(username);
  res.json(username);
});

app.get("/getUserID/:username", async (req, res, next) => {
  console.log(req.params.username);
  const username = req.params.username;
  let userID;
  await userModel.findOne({Username: username})
    .then(doc => {
      userID = doc._id;
      console.log(userID);
    })
    .catch(err => {
      console.log(err);
    });
    console.log(userID);
  res.json(userID);
});

module.exports = app;
