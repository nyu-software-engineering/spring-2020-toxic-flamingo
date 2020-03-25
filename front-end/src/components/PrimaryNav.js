import React from 'react';
//import './PrimaryNav.css';
import { Link } from 'react-router-dom';

const PrimaryNav = (props) => {
    return (
        <nav>
            <Link to="/logIn">Log In </Link>
            <Link to="/">Home </Link>
            <Link to="/Make_Post">Make_Post </Link>
            <Link to="/Profile">Profile </Link>
        </nav>
    )
}

export default PrimaryNav;