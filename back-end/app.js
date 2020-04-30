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
//require('dotenv').config();
// we will put some server logic here later...
//console.log(process.env.DB_USER);
//mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@toxicflamingo-isrgh.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true} );
//Get the default connection
//let db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)

//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.on('connected', () => {
  //console.log("connected with ")
//});

/*
const router = require('express-promise-router')();
const { validateBody, schemas } = require('./src/authentification/Helper.js');
const UsersController = require('./src/authentification/UserController.js');
const passport = require('passport');
const passportConf = require('./src/authentification/passport');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);


router.route('/')
      .post(validateBody(schemas.authSchema), passport.authenticate('local', {session: false}), UsersController.logIn);

router.route('/secret')
      .get(passport.authenticate('jwt', {session: false}), UsersController.secret);


let tag = new tagModel({
  tag: "waiyu",
  posts: []
});

app.use("/routes", require("./src/authentification/routes"));
*/

const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('./src/configuration'); 

signToken = (user) => {
    return JWT.sign({
        iss: 'Sharmony',
        sub: user._id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate + 1) // current time + 1 day
    }, JWT_SECRET)
}

app.post("/signUp", async (req, res, next) => {
        
  console.log('UsersController.signUp() called!');
  //console.log(req);
  let data = req.body;
  console.log(data);

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
  let newUser = new userModel({
      Email: email,
      Password: password,
      Username: username
  })
  await newUser.save();
  
  //generate token
  let token = signToken(newUser);

  //respond w token
  res.status(200).json({token: token});
})

app.get("/logIn", async (req, res, next) => {
  //generate tokens
  console.log("log in called");
  const token = signToken(req.user);
  res.status(200).json({token});
})



// let user123 = new userModel({
//   userID: "testtesttest",
//   Username: "gary333",
//   Password: "gary123",
//   Email: "gary@d.com",
//   Bio: "dfsdf",
//   Profile_Pic: "String",
//   Trophies: [],
//   follower: [],
//   following: [],
// })

// post123.save({runValidators:true}).then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log(err);
// });


// let post123 = new postModel({
//   userID: "testID",
//   postID: "78910",
//   hashID: "nyc",
//   harmony: true,
//   songName: "Imagine",
//   artistName: "Waiyu",
//   albumName: "Imagine",
//   picture: "pictureURL",
//   spotify: "spotifyURL",
//   descripton: "i love this song!"
//   comments: []
// });

// post123.save({runValidators:true}).then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log(err);
// });


app.get("/", (req, res) => {
    res.send("Hello!");
  });



// export the express app we created to make it available to other modules


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


// app.get("/user/:userID", (req, res) => {
//   const userID = req.params.userID;
//   res.send(user[userID]);
// })

app.get("/profileposts/:userID", async (req,res) => {
  const userID = req.params.userID;
  let response = await axios.get("https://api.mockaroo.com/api/cdf982f0?count=100&key=83e46730").catch();
  res.json(response.data);
})

app.get("/Followee", async (req, res) => {
  let response = await axios.get("https://api.mockaroo.com/api/87521f10?count=10&key=5296eab0").catch();
  res.json(response.data);
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
  //const user  = req.params.userid;
  let response = await axios.get("https://api.mockaroo.com/api/1a0149e0?count=20&key=ffab93f0").catch();
  res.json(response.data);
})

app.get("/Harmonies", async (req, res) => {
  //const user  = req.params.userid;
  let response = await axios.get("https://api.mockaroo.com/api/0abb6050?count=5&key=ffab93f0").catch();
  res.json(response.data);
})

app.get("/Follower", async (req, res) => {
  //const user  = req.params.userid;
  let response = await axios.get("https://api.mockaroo.com/api/87521f10?count=10&key=5296eab0").catch();
  res.json(response.data);
})



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
var client_id = '691936c2acfc4bad82db2fe642f023ec'; // Your client id
var client_secret = '2907a5de299c4052a6f9b3f738030a7a'; // Your secret
let search = req.params.search;
// your application requests authorization
var authOptions = {
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
    const userID = req.params.userID;
    const postID = req.params.postID;

    let commentToSubmit = new commentModel({
      userID: userID,
      text: comment
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

    let newNotification = new notificationModel({
      userID: 'testtestest',//data.userID,
      text: `user made a new comment!` //`${data.userID has a new post!}`
    })
    newNotification.save({runValidators:true}).then(doc => {
      console.log(data);
      }).catch(err => {
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
      })
      .catch(err => {
        console.log(err);
      });

    for (let i=0; i < comments.length; i++) {
      let comment = comments[i];

      await userModel.findById(comment.userID)
      .then(doc => {
        formattedComments.push({
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

// load a main feed of only followed users' posts
app.get('/mainFeed/:userId', async (req, res) => {

  const userID = req.params.userId;

  let following = [];

  await userModel.findById(userID)
    .then(doc => {
      following = doc.following;
      following.push(userID)
    })
    .catch(err => {
      console.log(err);
    });

  postModel.find({
    'userID': { $in: following.map((id, i) => {
      return mongoose.Types.ObjectId(id);
    })},
  })
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
  
  //const userID = req.params.userID; 
  let response = await axios.get("https://api.mockaroo.com/api/3ea885f0?count=12&key=ffab93f0");
  //res.json(getTrophyData(userID));
  let trophyList = [];

  for (let i=0; i<response.data.length; i++) {
    const trophy = response.data[i];
    //console.log(trophy);
    trophyList.push(trophy);
  }
  
  res.json(trophyList);
});

// load and filter a feed based on a hashtag
app.get('/hashtagFeed/:hashtag', async (req, res) => {

  const hashtag = req.params.hashtag; 

  postModel.find({
    'hashID': hashtag,
  })
  .then(result => {
    console.log(result);
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  })

});


app.post("/changeEmail/", (req, res) => {
  let data = req.body;
  const email = data.email;
  console.log(email);
  const uID = data.userID;
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
  const uID = data.userID;
  console.log(oldPass);
  console.log(newPass);
  console.log(uID);
  const user = await userModel.findById(uID);
  const isMatch = await user.isValidPassword(oldPass);
  if (isMatch) {
    userModel.findByIdAndUpdate(uID,{Password: newPass}, 
      {
        new : true,
        runValidators: true
      }).then(doc => {
        console.log(doc);
      }).catch(err => {
        console.log(err);
      })
  } else {
    console.log("incorrect current password");
  }
});

app.post("/createPost/", (req,res) => {
  let data = req.body
  console.log(req.body)
  //data = JSON.parse(data)
  //console.log(data.hashID);

  //search for harmony here if there is previous post with same song - songname and artist

  let newPost = new postModel({
    userID: data.userID,
    hashID: data.hashID,
    harmony: true, //figure that out after search
    songName: data.songName,
    artistName: data.artistName,
    albumName: data.albumName,
    picture: data.picture,
    spotify: data.spotify,
    description: data.description,
    comments: [{user:'godddamnit'}]//data.comments
  });

  //post data and send it to monodb atlas here 
  newPost.save({runValidators:true}).then(doc => {
      console.log('this is pushing data to DB')
      console.log(data);
      }).catch(err => {
      console.log(err);
      });
  //search for harmony here if there is previous post with same song - songname and artist
  //get post data and send it to monodb atlas here 

  let newNotification = new notificationModel({
    userID: 'testtestest',//data.userID,
    text: `user has a new post!` //`${data.userID has a new post!}`
  })
  newNotification.save({runValidators:true}).then(doc => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  });  
})

module.exports = app;
