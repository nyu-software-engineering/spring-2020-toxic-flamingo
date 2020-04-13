import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './Post.css';
import MusicPlayer from './MusicPlayer';

const Post = (props) => {

    const x = Math.round((Math.random() * 100));

    const [initialComment, setInitialComment] = useState({})

    const data = props.data;

    const postId = data.post_id;
    // load post's initial comment
    useEffect(() => {

        axios.get("/postComments/" + postId)
        .then((response) => {
            setInitialComment(response.data);
        })
        .catch(err => {
            console.log("error in Post object frontend");
            console.log(err);

            const backupData = {
                commenter_username: "commentman123",
                comment: "I love that song!",
                posted: "6:30 PM",
                remainingComments: 8,
            };

            setInitialComment(backupData);
        })
    }, []);
    
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
                <div className='seeMore'>See {initialComment.remainingComments} more comments</div>
            </div>
        </div>
    );

    
    
    // row with spotify playback info

    // row with first comment

    // row with see all comments
}

export default Post;