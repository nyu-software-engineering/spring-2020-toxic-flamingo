import React, {useState, useEffect, Component} from 'react';

import SharmonyLogoCropped from "./SharmonyLogoCropped.PNG";
import './SharmonyHeader.css';

const SharmonyHeader = (props) => {
    //console.log(userID);
    //const [userID, setUserID] = useState([]);
    const myPic = props.myPic;
    //setMyPic("https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg");
    // load in posts

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