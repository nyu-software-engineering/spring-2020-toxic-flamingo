import React, {useState, useEffect, Component} from 'react';

import './CommentView.css'


const CommentView = (props) => {

    const comment = props.data.comment;
    const commenter = props.data.commenter_username;

    return (
        <div className="CommentView">
            <p>{commenter}</p>
            <p> commented: {comment}</p>
        </div>
    )
}

export default CommentView;