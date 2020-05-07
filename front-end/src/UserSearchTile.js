import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './UserSearchTile.css';
import { Redirect } from 'react-router-dom';

const UserSearchTile = (props) => {

    const jsonObj = props.jsonObj;

    const [shouldRedirect, setRedirect] = useState(false);

    if (shouldRedirect) {
        return (
            <Redirect push to = '/UserProfile/'/>
        )
    }

    return (
        <div className ="post" onClick={() => {
            props.passUser(jsonObj._id);
            setRedirect(true);
        }}>
            <img src={"#"} alt="no img" ></img>
            <p >{jsonObj.Username}</p>
            <br/>
            <div className="line"></div>
        </div>
    )
}

export default UserSearchTile;