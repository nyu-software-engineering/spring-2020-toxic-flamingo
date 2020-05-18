import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './UserSearchTile.css';
import { Redirect } from 'react-router-dom';

const UserSearchTile = (props) => {

    const jsonObj = props.jsonObj;

    const [shouldRedirect, setRedirect] = useState(false);
    const [isPersonal, setIsPersonal] = useState(false);

    if (shouldRedirect) {
        console.log("in shouldredirect")
        if(isPersonal) {
            return <Redirect push to='/PersonalProfile/'/>
        } else {
            return <Redirect push to={'/UserProfile/' + jsonObj.Username}/>
        }
    }

    async function isProfile() {
        await axios.get("/isPersonal/" + jsonObj._id)
        .then ((response) => {
            console.log(response.data);
            setIsPersonal(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
    }

    return (
        <div className ="post" onClick={async () => {
            await isProfile();
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