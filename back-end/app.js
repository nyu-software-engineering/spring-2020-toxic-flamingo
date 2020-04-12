// import and instantiate express
const express = require("express"); // CommonJS import style!
const bodyParser = require("body-parser");
const app = express(); // instantiate an Express object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// we will put some server logic here later...
// export the express app we created to make it available to other modules

// mock post database
const posts = [
  {
    id: 1,
    artist_name: "Waiyu",
    song_title: "Imagine",
    username: "username123",
    post_title: "Cool song!",
    post_comment: "Very cool, thanks for sharing",
    post_commenter: "commentMan23",
    hashtag: "nyc"
  },
  {
    id: 2,
    artist_name: "Ace Frehley",
    song_title: "New York Groove",
    username: "username745",
    post_title: "Nice",
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

const trophies = [
  {
    id: 1,
    trophy: "Harmonize",
    trophy_description: "Get your first Harmony!",
    trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg",
    userID: 12345
  },
  {
    id: 2,
    trophy: "Musically Informed",
    trophy_description: "Follow 10 People!",
    trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg",
    userID: 12345
  },
  {
    id: 3,
    trophy: "So Popular",
    trophy_description: "Get 10 followers!",
    trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg",
    userID: 12345
  },

]

app.get('/trophies/:userID', (req, res) => {

  const userID = req.params.userID; 

  res.json(getTrophyData(userID));
});

app.get('/hashtagFeed/:hashtag', (req, res) => {

  const hashtag = req.params.hashtag; 

  res.json(getHashtagData(hashtag));
});

function getTrophyData(userID) {

  let trophyList = [];

  console.log(userID);

  for (let i=0; i<trophies.length; i++) {
    const trophy = trophies[i];
    console.log(trophy.userID);
    if (trophy.userID != userID) {
      continue;
    }
    
    trophyList.push(trophy);
  }

  return trophyList;
}


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
