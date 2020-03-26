import React, {useState, useEffect, Component} from 'react';

import './Post.css';
import MusicPlayer from './MusicPlayer';

const Post = (props) => {

    const x = Math.round((Math.random() * 100));

    const data = props.data;
    
    return (
        <div className="FeedPost">
            <div className='postHeader'>
                <img className='profileImage' alt='avatar' src={data.profile_picture} />
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
                    <p className='user'>@{data.username}</p><p className='comment'>{data.post_comment}Nice!</p>
                </div>
                <div className='seeMore'>See {x} more comments</div>
            </div>
        </div>
    );

    
    
    // row with spotify playback info

    // row with first comment

    // row with see all comments
}

export default Post;