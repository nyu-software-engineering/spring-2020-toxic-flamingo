import React, {useState, useEffect, Component} from 'react';

import './CommentView.css'
import { Redirect } from 'react-router-dom';


const CommentView = (props) => {

    const [shouldRedirect, setRedirect] = useState(false);

    const comment = props.data.text;
    const commenter = props.data.username;

    if (shouldRedirect) {
        return <Redirect push to='/UserProfile/'/>
    }

    return (
        <div className="CommentView">
            <p className='user' onClick={() => {
                props.passUser(props.data.userID);
                setRedirect(true);
            }}><b>{commenter}</b></p>
            <p> <b>commented:</b> {comment}</p>
        </div>
    )
}

export default CommentView;