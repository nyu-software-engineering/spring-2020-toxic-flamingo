import React from 'react';
import { NavLink } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = (props) => {

  return (
<div className="About">
    <h1>Change Password</h1>
    <section className="main-content">
        <img alt="about us" className="icon" src="https://www.amazeelabs.com/sites/default/files/styles/leading_image/public/images/current-affairs/Maintenance-Password-Policies-Blog_0.jpg?h=f89ac811&itok=7NkzikSw" />
        <form>
              <p>Enter your current password: </p>
              <input type='text' name='currentPassword' />
              <br/>
              <p>Enter your new password:</p>
              <input type='text' name='newPassword' />
              <br/>
              <NavLink to="/Home">Submit</NavLink>
              </form>
    </section>
</div>
  );
}

export default ChangePassword;