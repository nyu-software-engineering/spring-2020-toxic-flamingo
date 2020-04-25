// import and instantiate express
const axios = require("axios");
const express = require("express"); // CommonJS import style!
const bodyParser = require("body-parser");
const app = express(); // instantiate an Express object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const request = require("request");
const querystring = require('querystring');
let mongoose = require('mongoose');
let db = require('./src/database.js');
let userModel = require('./src/models/User.js');
let followModel = require('./src/models/Follow.js');
let postModel = require('./src/models/Post.js');
let trophyModel = require('./src/models/Trophy.js');
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




let user123 = new userModel({
        userID: "1jjj",   
        Username: "bob",
        Password: "1234",
        Email: "bob25@gmail.com",
        Bio: "hello my name is asdasdas",
        Profile_Pic: "link to picture",
        Trophies: [true, false, true, true, false, false, false, false]
})

user123.save().then(doc => {
  console.log(doc);
})

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
app.get('/login', function(req, res){
var client_id = '691936c2acfc4bad82db2fe642f023ec'; // Your client id
var client_secret = '2907a5de299c4052a6f9b3f738030a7a'; // Your secret

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

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/search?q=<artist name>&type=artist',
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
})


//post request for submitting a comment
app.post("/submitComment/:comment", (req, res) => {

    const comment = req.params.comment;

    console.log("comment is: " + comment);
});


// mock post database
const posts = [
  {
    id: 1,
    artist_name: "Waiyu",
    song_title: "Imagine",
    username: "username123",
    post_title: "Cool song! #nyc",
    post_comment: "Very cool, thanks for sharing",
    post_commenter: "commentMan23",
    hashtag: "nyc"
  },
  {
    id: 2,
    artist_name: "Ace Frehley",
    song_title: "New York Groove",
    username: "username745",
    post_title: "Nice #nyc",
    post_comment: "Nice, thanks",
    post_commenter: "commentMan23",
    hashtag: "nyc"
  },
  {
    id: 3,
    artist_name: "Dumb artist",
    song_title: "Dumb song",
    username: "username82",
    post_title: "Dumb song!",
    post_comment: "That was pretty dumb",
    post_commenter: "commentMan23",
    hashtag: "dumbsongs"
  }
];


//mock users followed database
const following = [
  {
    id: "ilovemusic14",
    followedUsers: [
      "user123", "musiclov3r",
    ]
  }
]

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

  const userId = req.params.userId;

  const followedUsers = getFollowedUsers(userId);

  let response = await axios.get("https://api.mockaroo.com/api/0abb6050?count=20&key=ffab93f0");

  // this logic would assumedly be taken care of in the eventual database queries
  let followedPosts = [];
  let data = response.data;
  for (let i=0; i<data.length; i++) {
    const post = data[i];
    if (followedUsers.includes(post.username)) followedPosts.push(post);
  }
  res.json(followedPosts);
});

function getFollowedUsers(userId) {

  const database = following;

  for (let i=0; i < database.length; i++) {
    let jsonObj = database[i];

    if (jsonObj.id == userId) {
      return jsonObj.followedUsers;
    }
  }
}

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

  let response = await axios.get("https://api.mockaroo.com/api/0abb6050?count=20&key=ffab93f0");

  let postsResponse = [];

  for (let i=0; i<response.data.length; i++) {
    const post = response.data[i];
    if (post.hashtag == hashtag) {
      postsResponse.push(post);
    }
  }

  res.json(postsResponse);
});


module.exports = app;
