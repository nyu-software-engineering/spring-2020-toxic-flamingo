import React, {useState, useEffect, Component} from 'react';

import './PostComments.css';
import CommentView from './CommentView';
import axios from 'axios';
import CommentBuilder from './CommentBuilder';

const PostComments = (props) => {
    
    let postID = props.postID;

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadCount, setReload] = useState(0);

    useEffect(() => {
        console.log("useEFfecting");
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
            <CommentBuilder postID={postID} updateComments={() => {
                console.log("HEY IM DOING SOMETHING");
                setReload(reloadCount + 1);
            }}/>
            <div className="buffer"></div>
        </div>
    );

}

export default PostComments;