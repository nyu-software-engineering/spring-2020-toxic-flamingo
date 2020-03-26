import React, {useState, useEffect, Component} from 'react';

import './Notification.css';


const Notification = (props) => {

    const data = props.data;

    let notificationString = '';
    const userName = data.username;

    if (data.isFollower) {
        notificationString = '@' + userName + ' just followed you!';
    }
    else {
        notificationString = '@' + userName + ' just commented on your post: ' + data.comment;
    }

    return (
        <div className="Notification">
            <img className='profileImage' alt='avatar' src={data.profile_picture} />
            <p>{notificationString}</p>
        </div>
    );
}


export default Notification;