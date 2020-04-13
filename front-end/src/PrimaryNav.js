import React from 'react';
//import './PrimaryNav.css';
import { Link } from 'react-router-dom';

const PrimaryNav = (props) => {
    return (
        <div class="nav">
        <nav>
            <div class="navigation">
            <div class="mainfeed">
            <Link to="/MainFeed">Home</Link>
            </div>
            <div class="search">
            <Link to="/Search">Search</Link>
            </div>
            <div class="makePost">
            <Link to="/Make_Post">Make_Post</Link>
            </div>
            <div class="notifications">
                
            </div>


            <Link to="/Settings">Settings</Link>
            <Link to="/PersonalProfile">Profile</Link>
            <Link to="/Profile">Profile</Link>
            <Link to="/HashtagFeed">Hashtags</Link>
            </div>
        </nav>
        </div>
    )
}

export default PrimaryNav;