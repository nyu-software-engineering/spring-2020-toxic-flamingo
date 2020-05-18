import React, {useState, useEffect, Component} from 'react';

import './CommentView.css'
import { Redirect } from 'react-router-dom';


const CommentView = (props) => {

    const [shouldRedirect, setRedirect] = useState(false);

    const comment = props.data.text;
    const commenter = props.data.username;

    if (shouldRedirect) {
        return <Redirect push to={'/UserProfile/' + commenter}/>
    }

    return (
        <div className="CommentView">
            <p className='user' onClick={() => {
                setRedirect(true);
            }}><b>{commenter}</b></p>
            <p className='commented'> <b>commented:</b> {comment}</p>
        </div>
    )
}

export default CommentView;