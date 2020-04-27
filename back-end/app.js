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





let post123 = new postModel({
  userID: "testID",
  postID: "4234234",
  hashID: "la",
  timestamp: '2020-01-21',
  harmony: true,
  songName: "I Love LA",
  artistName: "Randy Newman",
  albumName: "I Love LA",
  picture: "pictureURL",
  spotify: "spotifyURL",
  comments: []
});

// user123.save({runValidators:true}).then(doc => {
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


app.get("/user/:userID", (req, res) => {
  const userID = req.params.userID;
  res.send(user[userID]);
})

app.get("/profileposts/:userID", async (req,res) => {
  const userID = req.params.userID;
  let response = await axios.get("https://api.mockaroo.com/api/cdf982f0?count=100&key=83e46730").catch();
  res.json(response.data);
})

app.get("/Followee", async (req, res) => {
  let response = await axios.get("https://api.mockaroo.com/api/87521f10?count=10&key=5296eab0").catch();
  res.json(response.data);
})

app.get("/Search", async (req, res) => {
  //const user  = req.params.userid;
  let response = await axios.get("https://api.mockaroo.com/api/87521f10?count=10&key=5296eab0").catch();
  res.json(response.data);

})
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



app.get('/loadComments/:postId', async (req, res) => {

  const postId = req.params.postId;

  let response = await axios.get("https://api.mockaroo.com/api/0abb6050?count=20&key=ffab93f0");
  for (let i=0; i < response.data.length; i++) {
    if (response.data[i].post_id.toString() == postId) {
      console.log("found post with id " + postId);
      res.json(response.data[i].post_comments);
      break;
    }
  }
});

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
    let url = `https://api.spotify.com/v1/search?q=${search}&type=artist`
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
      console.log(body);
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
app.post("/submitComment/:comment", (req, res) => {

    const comment = req.params.comment;

    console.log("comment is: " + comment);
});



//load comments for a particular post
app.get('/loadComments/:postId', async (req, res) => {

    const postId = req.params.postId;

    let response = await axios.get("https://api.mockaroo.com/api/0abb6050?count=20&key=ffab93f0");
    for (let i=0; i < response.data.length; i++) {
      if (response.data[i].post_id.toString() == postId) {
        console.log("found post with id " + postId);
        res.json(response.data[i].post_comments);
        break;
      }
    }
});

// load a main feed of only followed users' posts
app.get('/mainFeed/:userId', async (req, res) => {

  const userID = req.params.userId;

  let following = [];

  await userModel.findById(userID)
    .then(doc => {
      following = doc.following;
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


module.exports = app;
