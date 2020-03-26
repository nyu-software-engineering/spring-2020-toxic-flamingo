import React from 'react';
//import './PrimaryNav.css';
import { Link } from 'react-router-dom';

const PrimaryNav = (props) => {
    return (
        <nav>
            <Link to="/MainFeed">Home</Link>
<<<<<<< HEAD
            <Link to="/Search">Search</Link>
            <Link to="/Make_Post">Make_Post</Link>
            <Link to="/Settings">Settings</Link>
            <Link to="/PersonalProfile">Profile</Link>
            <Link to="/Profile">Profile</Link>
            <Link to="/HashtagFeed">Hashtags</Link>
=======
            <Link to="/Make_Post">Make_Post</Link>
            <Link to="/Settings">Settings</Link>
            <Link to="/PersonalProfile">Profile</Link>
            
>>>>>>> newnewjackbranch
        </nav>
    )
}

export default PrimaryNav;