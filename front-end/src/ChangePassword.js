import React, {useState, useEffect, Component} from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import {Redirect} from 'react-router';
import "./ChangePassword.css";

import BurgerMenu from './BurgerMenu';

const ChangePassword = (props) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");
  const [correctPassword, setCorrectPassword] = useState("");

  let dataArray = {
    oldPassword: oldPass,
    newPassword: newPass,
    userID: "5eab5536cfcc1f47a02d55cf"
  }

  function submitPassword(e) {
    setIncorrectPassword("");
    console.log(dataArray)
    e.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND + "/changePassword/", dataArray, {withCredentials: true})
        .then ((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log("change password success");
              setCorrectPassword("Password changed successfully!")
            }
        })
        .catch( err => {
            console.error(err);
            setIncorrectPassword("Incorrect current password");
        })
}
function handleOldData(e) {
  setOldPass(e.target.value)
}

function handleNewData(e) {
  setNewPass(e.target.value)
}

return (
<div classname="burger">
<BurgerMenu right pageWrapID={"ProfileHeader"} outerContainerID={"outer-container"}/>
  <div className="ChangePassword">
    
      <h1>Change Password</h1>
      <section className="main-content">
          <img alt="about us" className="icon" src="https://www.amazeelabs.com/sites/default/files/styles/leading_image/public/images/current-affairs/Maintenance-Password-Policies-Blog_0.jpg?h=f89ac811&itok=7NkzikSw" />
          <form action="/change-password" method="POST">
                <p>Enter your current password: </p>
                <input type='text' name='currentPassword' onChange={handleOldData} />
                <br/>
                <div className='incorrectPassword'> 
                <p>{incorrectPassword}</p>
                </div>
                
                <p>Enter your new password:</p>
                <input type='text' name='newPassword' onChange={handleNewData}/>
                <br/>
                <button className='button1' onClick={submitPassword}>Submit</button>
                <div className='correctPassword'> 
                <p>{correctPassword}</p>
                </div>
                </form>
      </section>
  </div></div>
  );
}

export default ChangePassword;