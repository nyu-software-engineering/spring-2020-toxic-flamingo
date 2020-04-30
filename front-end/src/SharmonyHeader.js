import React from 'react';
import SharmonyLogoCropped from "./SharmonyLogoCropped.PNG";
import './SharmonyHeader.css';

const SharmonyHeader = (props) => {
    return(
        <div className="headerParent">
            <div className="header">
                <img alt="SharmonyLogoCropped.PNG" src={SharmonyLogoCropped}  />
            </div>
            <div className="profilePic">
                <a href="/PersonalProfile">
                    <img alt='profile pic' src="https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg" width="100" height="100" />
                </a>
            </div>
        </div>
    );
};

export default SharmonyHeader;