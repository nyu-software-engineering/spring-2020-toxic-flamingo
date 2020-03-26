import React from 'react';
import { NavLink } from "react-router-dom";
import './Settings.css';

const Settings = (props) => {
  return (
        <div className="container">
            
            <h1>Settings</h1>
            <NavLink to="/ChangeEmail">Change Email</NavLink>
            <NavLink to="/ChangePassword">Change Password</NavLink>
            <NavLink to="/NotificationSettings">Notification Settings</NavLink>
            <NavLink to="/Trophies">Trophies</NavLink>
            <section className="main-content">
                <img alt="icon" className="icon" src="https://imageog.flaticon.com/icons/png/512/126/126472.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" />
                <p>
                    We doing settings lets gooooooo
                </p>
                
            </section>
        </div>
    );
}

export default Settings;