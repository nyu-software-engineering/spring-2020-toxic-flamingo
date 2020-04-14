import React from 'react';
import { NavLink } from "react-router-dom";
import "./ChangeEmail.css";
const ChangeEmail = (props) => {
  return (
<div className="ChangeEmail">
    <h1>Change Email</h1>
    <section className="main-content">
        <img alt="about us" className="icon" src="https://cdn1.iconfinder.com/data/icons/e-mail-11/48/Change-Mail-Email-Letter-Communication-512.png" />
        <form>
              <p>Enter your new email: </p>
              <input type='text' name='email' />
              <br/>
              <NavLink to="/MainFeed">Submit</NavLink>
              </form>
    </section>
</div>
  );
}

export default ChangeEmail;