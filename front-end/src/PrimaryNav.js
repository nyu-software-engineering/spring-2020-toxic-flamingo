import React from 'react';
//import './PrimaryNav.css';
import { Link } from 'react-router-dom';

const PrimaryNav = (props) => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/Make_Post">Make_Post</Link>
            <Link to="/Settings">Settings</Link>
            <Link to="/PersonalProfile">Profile</Link>
            
        </nav>
    )
}

export default PrimaryNav;