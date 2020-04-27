import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './CommentBuilder.css';

const CommentBuilder = (props) => {

    const [commentText, updateCommentText] = useState("");

    const [userID, updateUserID] = useState("PLACEHOLDER_ID");

    const postID = props.postID;

    function submitComment(e) {
        e.preventDefault();
        
        axios.post("/submitComment/" + commentText + "/" + userID + "/" + postID);
    }

    function handleComment(e) {
        updateCommentText(e.target.value);
    }

    return (
        <div className="CommentBuilder">
            <form>
                <p>Enter a comment</p>
                <input className="commentText" type='text' name='comment' onChange={handleComment}/>
                <br/>
                <button onClick={submitComment}>Submit</button>
            </form>
        </div>
    )
}

export default CommentBuilder;