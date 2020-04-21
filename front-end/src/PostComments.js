import React, {useState, useEffect, Component} from 'react';

import './PostComments.css';
import CommentView from './CommentView';
import axios from 'axios';
import CommentBuilder from './CommentBuilder';

const PostComments = (props) => {
    
    let postId = window.location.pathname;

    postId = postId.replace("/PostComments/", "");

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/loadComments/' + postId)
        .then((response) => {
            setComments(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log("ERRor in postComments.js");
            console.log(err);
        })
    }, []);

    if (loading == true) {
        return (
            <div>
                <h2>Loading</h2>
            </div>
        )
    }

    return (

        <div className="PostComments">
            {comments.map((commentJson, i) => (
                <CommentView key={i} data={commentJson}/>
            ))}
            <CommentBuilder/>
        </div>
    );

}

export default PostComments;