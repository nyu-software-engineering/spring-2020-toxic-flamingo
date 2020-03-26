import React from 'react';
//import './PrimaryNav.css';
import { Link } from 'react-router-dom';

const PrimaryNav = (props) => {
    return (
        <nav>
            <Link to="/MainFeed">Home</Link>
            <Link to="/Make_Post">Make_Post</Link>
<<<<<<< HEAD
            <Link to="/Settings">Settings</Link>
            <Link to="/PersonalProfile">Profile</Link>
            
=======
            <Link to="/Profile">Profile</Link>
            <Link to="/HashtagFeed">Hashtags</Link>
>>>>>>> newnewjackbranch
        </nav>
    )
}

export default PrimaryNav;