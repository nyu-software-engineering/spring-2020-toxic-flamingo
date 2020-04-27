import React from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import "./ChangeEmail.css";
const ChangeEmail = (props) => {
  const [data, setData] = [];
  const userId = "5ea5f57f46ba2e699831ae3f";
  function submitEmail(e) {
    e.preventDefault();
    axios.get("/changeEmail/", {userID: userId, Email: data})
        .then ((response) => {
            
            setData(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
}
  
  return (
<div className="ChangeEmail">
    <h1>Change Email</h1>
    <section className="main-content">
        <img alt="about us" className="icon" src="https://cdn1.iconfinder.com/data/icons/e-mail-11/48/Change-Mail-Email-Letter-Communication-512.png" />
        <form>
              <p>Enter your new email: </p>
              <input type='text' name='email' />
              <br/>
              <NavLink to="/MainFeed">
                <button onClick={submitEmail}>Submit</button>
              </NavLink>
              </form>
    </section>
</div>
  );
}

export default ChangeEmail;