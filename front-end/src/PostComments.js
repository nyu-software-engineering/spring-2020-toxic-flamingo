import React, {useState, useEffect, Component} from 'react';

import './PostComments.css';
import CommentView from './CommentView';
import axios from 'axios';
import CommentBuilder from './CommentBuilder';
import FeedWrapper from './FeedWrapper';

const PostComments = (props) => {
    
    let postID = props.postID;

    let isMainFeed = props.isMainFeed;
    let hashtag = props.hashtag;

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadCount, setReload] = useState(0);

    const [shouldRedirect, setRedirect] = useState(false);

    useEffect(() => {
        axios.get('/loadComments/' + postID)
        .then((response) => {
            setComments(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log("ERRor in postComments.js");
            console.log(err);
        })
    }, [reloadCount]);

    if (shouldRedirect) {
        return (
            <FeedWrapper isMainFeed={isMainFeed} hashtag={hashtag}/>
        )
    }

    if (loading == true) {
        return (
            <div>
                <h2>Loading</h2>
            </div>
        )
    }

    return (

        <div className="PostComments">
            <img src="/back-button.jpg" alt="where my button at" height="10" width="10" onClick={() => {
                console.log("hashtag: " + hashtag);
                console.log("isMainFeed: " + isMainFeed);
                setRedirect(true);
            }}></img>
            {comments.map((commentJson, i) => (
                <CommentView key={i} data={commentJson} passUser={(userID) => props.passUser(userID)}/>
            ))}
            <CommentBuilder postID={postID} updateComments={() => {
                setReload(reloadCount + 1);
            }}/>
            <div className="buffer"></div>
        </div>
    );

}

export default PostComments;