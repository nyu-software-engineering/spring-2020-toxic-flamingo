import React from 'react';
import './PrimaryNav.css';
import { Link } from 'react-router-dom';

const PrimaryNav = (props) => {
    return (
        // <div class="nav">
        // <nav>
        //     <div class="navigation">
        //     <div class="mainfeed">
        //     <Link to="/MainFeed">Home</Link>
        //     </div>
        //     <div class="search">
        //     <Link to="/Search">Search</Link>
        //     </div>
        //     <div class="makePost">
        //     <Link to="/Make_Post">Make_Post</Link>
        //     </div>
        //     <div class="notifications">
                
        //     </div>


        //     <Link to="/Settings">Settings</Link>
        //     <Link to="/PersonalProfile">Profile</Link>
        //     <Link to="/">Log_Out</Link>
        //     <Link to="/HashtagFeed">Hashtags</Link>
        //     </div>
        // </nav>
        // </div>

        <div className="nav_bar"> 
            <div className="flex-container">
                <nav>
                    <ul className ="nav_link"> 
                    <li><a href="/MainFeed">Home</a></li>
                    <li><a href="/Search">Search</a></li>
                    <li><a href="/Make_Post">New Post</a></li>
                    <li><a href="/Notifications">Notifications</a></li>
                   
                    <li><a href="/">Log Out</a></li>
                    <li><a href="/HashtagFeed">Hashtags</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default PrimaryNav;