// import and instantiate express
const axios = require("axios");
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules

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

// load a main feed of only followed users' posts
app.get('/mainFeed/:userId', async (req, res) => {

  const userId = req.params.userId;

  const followedUsers = getFollowedUsers(userId);

  let response = await axios.get("https://api.mockaroo.com/api/0abb6050?count=20&key=ffab93f0");

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

// load and filter a feed based on a hashtag
app.get('/hashtagFeed/:hashtag', (req, res) => {

  const hashtag = req.params.hashtag; 

  res.json(getHashtagData(hashtag));
});

function getHashtagData(hashtag) {

  let postsResponse = [];

  console.log(hashtag);

  for (let i=0; i<posts.length; i++) {
    const post = posts[i];
    console.log(post.hashtag);
    if (post.hashtag != hashtag) {
      continue;
    }
    
    postsResponse.push(post);
  }

  return postsResponse;
}

module.exports = app;
