import React, {useState, useEffect, Component} from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import "./ChangePassword.css";

const ChangePassword = (props) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  let dataArray = {
    oldPassword: oldPass,
    newPassword: newPass,
    userID: "5ea5f57f46ba2e699831ae3f"
  }

  function submitPassword(e) {
    console.log(dataArray)
    e.preventDefault();
    axios.post("/changePassword/", dataArray)
        .then ((res) => {
            console.log('request is ok');
        })
        .catch( err => {
            console.error(err);
        })
}
function handleOldData(e) {
  setOldPass(e.target.value)
}

function handleNewData(e) {
  setNewPass(e.target.value)
}

  return (
<div className="ChangePassword">
    <h1>Change Password</h1>
    <section className="main-content">
        <img alt="about us" className="icon" src="https://www.amazeelabs.com/sites/default/files/styles/leading_image/public/images/current-affairs/Maintenance-Password-Policies-Blog_0.jpg?h=f89ac811&itok=7NkzikSw" />
        <form action="/change-password" method="POST">
              <p>Enter your current password: </p>
              <input type='text' name='currentPassword' onChange={handleOldData} />
              <br/>
              <p>Enter your new password:</p>
              <input type='text' name='newPassword' onChange={handleNewData}/>
              <br/>
              <button onClick={submitPassword}>Submit</button>
              </form>
    </section>
</div>
  );
}

export default ChangePassword;