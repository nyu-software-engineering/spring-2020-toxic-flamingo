import React, {useState, useEffect, Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Post.css';
import MusicPlayer from './MusicPlayer';
import { Redirect } from 'react-router-dom';

const Post = (props) => {
    const [audioPlayer] = useState(new Audio());

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
    
    function play() {
        audioPlayer.src(data.spotify)
        audioPlayer.play();
    }


    // make sure you dont see "see more comments if there are none"
    let button;
    if (remainingComments > -5) {
    button = (
        // <nav>
        //     <Link to={"/PostComments/" + data._id}>See {remainingComments} more comments</Link>
        // </nav>
        <button onClick={handleClick}>Click me!</button>
    );
    }



    return (
        <div className="FeedPost">
            <div className='postHeader'>
                <div className='posterInfo'>
                    <img className='profileImage' alt='avatar' src={data.picture} />
                    <h4>{data.username}</h4>
                </div>
                <h3>{data.post_title}</h3>
            </div>
            <div className='postContent'>
                <div className='songInfo'>
                    <p>Artist: {data.artistName}</p>
                    <p>Title: {data.songName}</p>
                </div>
                <div className='playInfo'>
                    <button onClick={play}>Play</button>
                </div>
            </div>
            <div className='description'>
                <p>{data.description}</p>
            </div>
            <div className="commentsTitle"><h5>Comments</h5></div>
            <div className='postComments'>
                <div className='initialComment'>
                    <p className='user'>@PLACEHOLDER UNTIL COMENTS WORK</p><p className='comment'>PLACEHOLDER UNTIL COMENTS WORK</p>
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
