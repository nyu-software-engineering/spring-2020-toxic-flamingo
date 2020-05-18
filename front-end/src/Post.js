import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import './Post.css';
import MusicPlayer from './MusicPlayer';
import { Redirect } from 'react-router-dom';

import ReactHashtag from 'react-hashtag';

//onst cors = require('cors');

const Post = (props) => {
    const [audioPlayer] = useState(new Audio());
    let val = "Play";
    const [playPause, setData] = useState(val);
    const [username, setUsername] = useState("");
    const [shouldRedirect, setRedirect] = useState(false);
    const [shouldHashtagRedirect, setHashtagRedirect] = useState(false);
    const [hashtag, setHashtag] = useState("");
    const [isPersonal, setIsPersonal] = useState(false);
    const [img, setImg] = useState("https://cdn4.iconfinder.com/data/icons/game-interface-outline/100/objects-17-512.png");
    const [profilePic, setProfilePic] = useState("");
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
        audioPlayer.volume = 0.1;
        let spotifyLink = data.spotify
        console.log(spotifyLink)
        if (playPause == 'Pause') {
            audioPlayer.pause();
            setData('Play');
            setImg("https://cdn4.iconfinder.com/data/icons/game-interface-outline/100/objects-17-512.png");
        }
        else {
            val = 'Pause';
        setData(val);
        setImg("https://cdn1.iconfinder.com/data/icons/media-volume-1/48/017-512.png");
        audioPlayer.src=spotifyLink
        audioPlayer.play();
        }
    }

    useEffect(() => {
        axios.get("/getUsername/" + userID)
        .then ((response) => {
            setUsername(response.data.username);
            console.log(username);
            setProfilePic(response.data.profilepic);
            console.log(profilePic);
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

    if (shouldHashtagRedirect) {
        return <Redirect push to={'/HashtagFeed/' + hashtag.replace('#','')}/>
    }

    return (
        <div className="FeedPost">
            <div className='postHeader'>
              <div className='username'>
                  <img className='profilepic' src={profilePic} />  
              
                <h4 onClick={() => {
                    setUsername(username)
                    setRedirect(true);
                }}>{username}</h4>
                </div>
            </div>
           
            <div className='posterInfo'>
                   
                        <img className='playButton' src={img} onClick={musicPlayer} />
                    
                    <img className='albumImage' alt='avatar' src={data.picture} />
            </div>
            <div className='postContent'>
                <div className='songInfo'>
                    <p>{data.artistName} -- {data.songName}</p>
                </div>
            </div>
            <div className='description'>
                <p>
                <ReactHashtag renderHashtag={(hashtagValue) => (
                    <span className='hashtags' onClick={ ()=> {
                        setHashtagRedirect(true);
                        setHashtag(hashtagValue);
                        console.log(hashtagValue);
                    }}>
                        {hashtagValue}
                    </span>
                )}>
                    {data.description}
                </ReactHashtag>
                </p>
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
