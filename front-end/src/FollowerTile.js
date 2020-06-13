import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './UserSearchTile.css';
import { Redirect } from 'react-router-dom';

const FollowerTile = (props) => {

    const userID = props.userID;

    const [shouldRedirect, setRedirect] = useState(false);
    const [isPersonal, setIsPersonal] = useState(false);
    const [data, setData] = useState();

    useEffect( () => {
        axios.get(process.env.REACT_APP_BACKEND + '/user/' + 'false/' + userID, {withCredentials: true})
        .then ((response) => {
            setData(response.data);
        })
    }, []);

    if (shouldRedirect) {
        console.log("in shouldredirect")
        if(isPersonal) {
            return <Redirect push to='/PersonalProfile/'/>
        } else {
            return <Redirect push to={'/UserProfile/' + data.username}/>
        }
    }

    async function isProfile() {
        await axios.get(process.env.REACT_APP_BACKEND + "/isPersonal/" + userID, {withCredentials: true})
        .then ((response) => {
            console.log(response.data);
            setIsPersonal(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
    }
    if (!data) {
        return ("");
    } else {
        return (
            <div className ="post" onClick={async () => {
                await isProfile();
                setRedirect(true);
            }}>
                <img className="profPic" src={data.pic} alt="no img" width="50" height="50"></img>
                <p >{data.username}</p>
                <br/>
                <div className="line"></div>
            </div>
        )
    }
}

export default FollowerTile;