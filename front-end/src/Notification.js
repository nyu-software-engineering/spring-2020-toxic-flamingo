import React, {useState, useEffect, Component} from 'react';

import './Notification.css';


const Notification = (props) => {

    const data = props.data;
    console.log(data);

    let notificationString = '';
    //const userName = data.userID;
    notificationString = data.text;
    /*if (data.isFollower) {
        //notificationString = '@' + userName + ' just followed you!';
        notificationString = data.text;
    }
    else {
        //notificationString = '@' + userName + ' just commented on your post: ' + data.comment;
        notificationString = data.text;
    }
    */

      

    return (
        <div className="Notification">
            <p>{notificationString}</p>
        </div>
    );
}


export default Notification;