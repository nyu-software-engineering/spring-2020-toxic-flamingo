import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './UserSearchTile.css';
import { Redirect } from 'react-router-dom';

const UserSearchTile = (props) => {

    const jsonObj = props.jsonObj;

    const [shouldRedirect, setRedirect] = useState(false);

    if (shouldRedirect) {
        return (
            <Redirect push to = '/UserProfile/' />
        )
    }

    return (
        <div className ="post" onClick={() => {
            props.passUser(jsonObj._id);
            setRedirect(true);
        }}>
            <img className="profPic" src={jsonObj.Profile_Pic} alt="no img" width="50" height="50"></img>
            <p >{jsonObj.Username}</p>
            <br/>
            <div className="line"></div>
        </div>
    )
}

export default UserSearchTile;