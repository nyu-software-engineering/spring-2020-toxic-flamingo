import React, {useState} from 'react';
import './Make_Post2.css';
import Axios from '../../back-end/node_modules/axios';

const Make_Post2 = (props) => {
    const data = props.songData;
    console.log(data);
    console.log("got data " + props.songData + " in make post 2");
    for(let i = 0; i < data.artists.length; i++){
        console.log(data.artists[i].name);
    }
    const [description, updatedescription] = useState("");   
    function handledescription(e) {
        updatedescription(e.target.value);
        // I love this music #rock because #cool so I like this song. 
        //# => make them link to search result with the hash name 
        // we store them. 
        // dscription : texts including hash 
        
    }



    function postIt() {
        console.log("Posting test")
        let artists = [];
        for(let i = 0; i < data.artists.length; i++){
            artists.push(data.artists[i].name);
        }
        let dataaaaa =  {
            userID: null,   // import 
            postID: null,   // import 
            hashID: "la",
            timestamp: '2020-01-21',
            harmony: true,  // import 
            songName: data.name,
            artistName: artists,
            albumName: data.album.name,
            picture: data.album.images[0].url,
            spotify: data.external_urls.spotify,
            description: description,
            comments: []
          }
        dataaaaa= JSON.stringify(dataaaaa);

        Axios.get('/createPost'+ dataaaaa)
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
                <form action="/MainFeed">
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