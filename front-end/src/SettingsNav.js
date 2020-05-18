import React from 'react';
//import './PrimaryNav.css';
import { NavLink } from 'react-router-dom';
import './SettingsNav.css';


const PrimaryNav = (props) => {
    return (

        <div className="back">
        <NavLink to="/PersonalProfile">Go Back</NavLink>
        </div>
 
    )
}

export default PrimaryNav;