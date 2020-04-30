import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './CommentBuilder.css';

const CommentBuilder = (props) => {

    const [commentText, updateCommentText] = useState("");

    const [userID, updateUserID] = useState("5eab5536cfcc1f47a02d55cf");

    const postID = props.postID;

    function submitComment(e) {
        e.preventDefault();

        if (commentText.trim() == "") {
            // NO COMMENT IN THE BOX

            console.log("NOPE");
            return;
        }
        
        axios.post("/submitComment/" + commentText + "/" + userID + "/" + postID)
        .then(res => {
            console.log("GOT A RESPONSE");
            console.log(res);
            updateCommentText("");
            props.updateComments();
        })

    }

    function handleComment(e) {
        updateCommentText(e.target.value);
    }

    return (
        <div className="CommentBuilder">
            <form autoComplete="off">
                <p>Enter a comment</p>
                <input className="commentText" type='text' name='comment' value={commentText} onChange={handleComment}/>
                <br/>
                <button onClick={submitComment}>Submit</button>
            </form>
        </div>
    )
}

export default CommentBuilder;