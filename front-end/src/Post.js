import React, {useState, useEffect, Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Post.css';
import MusicPlayer from './MusicPlayer';
import { Redirect } from 'react-router-dom';
//onst cors = require('cors');

const Post = (props) => {
    const [audioPlayer] = useState(new Audio());
    let val = "Play";
    const [playPause, setData] = useState(val);
    const [username, setUsername] = useState("");
    const [shouldRedirect, setRedirect] = useState(false);
    const [isPersonal, setIsPersonal] = useState(false);
    
    const data = props.data;
    const userID = data.userID;
    

    const commentsData = data.comments;
    let initialComment = "No comments here";
    let remainingComments = 0;
    if (commentsData.length > 0) {
        initialComment = commentsData[0];
        remainingComments = commentsData.length-1;
    }

    function handleClick(e) {
        props.loadComments(data._id)
    }
    
    function musicPlayer() {
        let spotifyLink = data.spotify
        console.log(spotifyLink)
        if (playPause == 'Pause') {
            audioPlayer.pause();
            setData('Play');
        }
        else {val = 'Pause';
        setData(val);
        
        audioPlayer.src=spotifyLink
        audioPlayer.play();
        }
    }

    useEffect(() => {
        axios.get("/getUsername/" + userID)
        .then ((response) => {
            setUsername(response.data);
            console.log(username);
            console.log(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
    });

    async function isProfile() {
        await axios.get("/isPersonal/" + userID)
        .then ((response) => {
            console.log(response.data);
            setIsPersonal(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
    }
    

    // make sure you dont see "see more comments if there are none"
    let button;
    if (remainingComments > 0) {
    button = (
        // <nav>
        //     <Link to={"/PostComments/" + data._id}>See {remainingComments} more comments</Link>
        // </nav>
        <button onClick={handleClick}>See {remainingComments} comment(s)</button>
    );
    }
    else {
        button = (
            <button onClick={handleClick}>Add a comment</button>
        )
    }

    if (shouldRedirect) {
        console.log("in shouldredirect")
        if(isPersonal) {
            return <Redirect push to='/PersonalProfile/'/>
        } else {
            return <Redirect push to={'/UserProfile/' + username}/>
        }
    }

    return (
        <div className="FeedPost">
            <div className='postHeader'>
              <div className='username'>
                <h4 onClick={() => {
                    setUsername(username)
                    setRedirect(true);
                }}>{username}</h4>
                </div>
            </div>
            <div className='postContent'>
                <div className='songInfo'>
                    <p>{data.artistName} -- {data.songName}</p>
                </div>
            </div>
            <div className='posterInfo'>
                    <div className='musicPlayer'><button onClick={musicPlayer}>{playPause}</button></div>
                    <img className='albumImage' alt='avatar' src={data.picture} />
                </div>
            <div className='description'>
                <p>{data.description}</p>
            </div>
            <div className='postComments'>
                {button}
            </div>
        </div>
    );

    
    
    // row with spotify playback info

    // row with first comment

    // row with see all comments
}

export default Post;
