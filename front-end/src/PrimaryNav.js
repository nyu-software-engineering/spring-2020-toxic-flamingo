import React from 'react';
//import './PrimaryNav.css';
import { Link } from 'react-router-dom';

const PrimaryNav = (props) => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/Make_Post">Make_Post</Link>
            <Link to="/Profile">Profile</Link>
            <Link to="/Settings">Settings</Link>
        </nav>
    )
}

export default PrimaryNav;