import React from 'react';
import SharmonyLogoCropped from "./SharmonyLogoCropped.PNG";
import './SharmonyHeader.css';

const SharmonyHeader = (props) => {


    console.log(document.cookies);

    return(
        <div className="headerParent">
            <div className="header">
                <img className ="headerImage" alt="SharmonyLogoCropped.PNG" src={SharmonyLogoCropped}  />
            </div>
            <div className="profilePic">
                <a href="/PersonalProfile">
                    <img className ="profileImage" alt='profile pic' src="https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg" width="100" height="100" />
                </a>
            </div>
        </div>
    );
};

export default SharmonyHeader;