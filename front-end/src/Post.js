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
    const data = props.data;

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


    // make sure you dont see "see more comments if there are none"
    let button;
    if (remainingComments > 0) {
    button = (
        // <nav>
        //     <Link to={"/PostComments/" + data._id}>See {remainingComments} more comments</Link>
        // </nav>
        <button onClick={handleClick}>See {remainingComments} more comment(s)</button>
    );
    }
    else {
        button = (
            <button onClick={handleClick}>Add a comment</button>
        )
    }

    

    return (
        <div className="FeedPost">
            <div className='postHeader'>
                <h4>{data.username}</h4>
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
            <div className="commentsTitle"><h5>Comments</h5></div>
            <div className='postComments'>
                <div className='initialComment'>
                    <p className='comment'>{initialComment.text}</p>
                </div>
                {button}
            </div>
        </div>
    );

    
    
    // row with spotify playback info

    // row with first comment

    // row with see all comments
}

export default Post;
