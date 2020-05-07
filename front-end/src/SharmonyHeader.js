import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import SharmonyLogoCropped from "./SharmonyLogoCropped.PNG";
import './SharmonyHeader.css';

const SharmonyHeader = (props) => {
    let {userID} = props;
    //console.log(userID);
    //const [userID, setUserID] = useState([]);
    const [myPic, setMyPic] = useState([]);
    //setMyPic("https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg");
    // load in posts
    useEffect( () => {
        //fetch data

        axios.get("/status")
        .then ((response) => {
            console.log(response.data.profPic);
            console.log(response.data.decodedToken.sub);

            userID = response.data.decodedToken.sub;
            console.log(userID);
            //userID.handleUserID(response.data.decodedToken.sub);
            setMyPic(response.data.profPic);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
        
    }, []);


    return(
        <div className="headerParent">
            <div className="header">
                <img className ="headerImage" alt="SharmonyLogoCropped.PNG" src={SharmonyLogoCropped}  />
            </div>
            <div className="profilePic">
                <a href="/PersonalProfile">
                    <img className ="profileImage" alt='profile pic' src={myPic} width="100" height="100" />
                </a>
            </div>
        </div>
    );
};

export default SharmonyHeader;