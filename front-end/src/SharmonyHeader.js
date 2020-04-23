import React from 'react';
import SharmonyLogoCropped from "./SharmonyLogoCropped.PNG";

const SharmonyHeader = (props) => {
    return(
        <div className="header">
             <img alt="SharmonyLogoCropped.PNG" src={SharmonyLogoCropped}  />
             <a href="/PersonalProfile" >
                <img alt='profile pic' src="https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg" width="100" height="100" />
             </a>
        </div>
    );
};

export default SharmonyHeader;