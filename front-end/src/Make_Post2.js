import React, {useState} from 'react';
import './Make_Post2.css';
import axios from 'axios';

const Make_Post2 = (props) => {
    const data = props.songData;
    console.log(data);
    console.log("got data " + props.songData + " in make post 2");

    for(let i = 0; i < data.artists.length; i++){
        console.log(data.artists[i].name);
    }
    const [description, updateDescription] = useState("");
    const [hashtags, updateHashtags] = useState("");
  
    function handledescription(e) {
        updateDescription(e.target.value);
        console.log("description:" + e.target.value);
        let descrp = e.target.value;
        let tags = descrp.match(/#\w+/g);
        console.log("hashtags:" + tags);
        updateHashtags(tags);
        // I love this music #rock because #cool so I like this song. 
        //# => make them link to search result with the hash name 
        // we store them. 
        // dscription : texts including hash 
        
    }



    function postIt(e) {
        e.preventDefault();
        console.log("Posting test")
        console.log(data.preview_url)
        let artists = [];
        for(let i = 0; i < data.artists.length; i++){
            artists.push(data.artists[i].name);
        }
        let songData =  {
            userID: "5ea5f57f46ba2e699831ae3f",   // import 
            hashID: hashtags, //array of hashtags with '#' behind every tag
            harmony: true,  // import 
            songName: data.name,
            artistName: artists,
            albumName: data.album.name,
            picture: data.album.images[0].url,
            spotify: data.preview_url,
            description: description,
            comments: []
          }
        //dataaaaa= JSON.stringify(dataaaaa);

        //Axios.get('/createPost', {data: dataaaaa})
        axios.post('/createPost/', songData)
        // if second request is ok, receive a notification 
        .then((res) => {
            console.log('request is ok');
        })
        // if there is an error, receive a notification
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="Header">
            <div class="flex-container">
                <div class="back_button">
                <img src="/back-button.jpg" alt="where my button at"></img>
                <button class="btn">a</button>
                </div>
                <div>
                <img src="/temp-logo.jpg" alt="logo plz" width="200" height="50"></img>
                </div>

            </div>

         
            <div class="picture"><img src = {data.album.images[0].url} alt="image over"></img></div>
            <div>{data.name}</div>
            <div class="text"> 
            <input type="text" placeholder="Write your music!" onChange ={handledescription}></input>
            </div>

            <div class="post">
                <form>
                    {/* this is where we create post object and send it to back end*/}

                    <button onClick={postIt}>Create Post</button>
                 </form>
            </div>


            <div className="nav_bar"> 
                <div class="flex-container">
                <nav>
                    <ul class ="nav_link"> 
                    <li><a href="/MainFeed">Home</a></li>
                    <li><a href="#">Search</a></li>
                    <li><a href="/Make_Post">New Post</a></li>
                    <li><a href="#">Notifications</a></li>
                    </ul>
                </nav>
                </div>
                </div>
        </div>
        
    );
}

export default Make_Post2;