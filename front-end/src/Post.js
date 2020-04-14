import React, {useState, useEffect, Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Post.css';
import MusicPlayer from './MusicPlayer';
import { Redirect } from 'react-router-dom';

const Post = (props) => {

    const [shouldRedirect, setRedirect] = useState(false);

    const data = props.data;

    const commentsData = props.data.post_comments;
    const initialComment = commentsData[0];
    const remainingComments = commentsData.length-1;


    // make sure you dont see "see more comments if there are none"
    let button;
    if (remainingComments > 0) {
    button = (
        <nav>
            <Link to={"/PostComments/" + data.post_id}>See {remainingComments} more comments</Link>
        </nav>
    );
    }

    if (shouldRedirect) {
        return (
            <Redirect to={"/PostComments/" + data.post_id}/>
        )
    }


    return (
        <div className="FeedPost">
            <div className='postHeader'>
                <div className='posterInfo'>
                    <img className='profileImage' alt='avatar' src={data.profile_picture} />
                    <h4>{data.username}</h4>
                </div>
                <h3>{data.post_title}</h3>
            </div>
            <div className='postContent'>
                <div className='songInfo'>
                    <p>Artist: {data.artist_name}</p>
                    <p>Title: {data.song_title}</p>
                </div>
                <div className='playInfo'>
                    <MusicPlayer/>
                </div>
            </div>
            <div className="commentsTitle"><h5>Comments</h5></div>
            <div className='postComments'>
                <div className='initialComment'>
                    <p className='user'>@{initialComment.commenter_username}</p><p className='comment'>{initialComment.comment}</p>
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