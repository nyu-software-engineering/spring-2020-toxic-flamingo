import React, {useState, useEffect, Component} from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import "./ChangeEmail.css";
const ChangeEmail = (props) => {
  const [data, setData] = useState("");
  let dataArray = {
    email: data,
    userID: "5ea5f57f46ba2e699831ae3f"
  }
  function submitEmail(e) {
    e.preventDefault();
    console.log(data)
    axios.post("/changeEmail/", dataArray)
        .then ((res) => {
            console.log('request is ok');
        })
        .catch( err => {
            console.error(err);
        })
}

function handleData(e) {
  setData(e.target.value)
}
  
  return (
<div className="ChangeEmail">
    <h1>Change Email</h1>
    <section className="main-content">
        <img alt="about us" className="icon" src="https://cdn1.iconfinder.com/data/icons/e-mail-11/48/Change-Mail-Email-Letter-Communication-512.png" />
        <form>
              <p>Enter your new email: </p>
              <input className='newEmail' type='text' name='email' onChange={handleData} />
              
                <button onClick={submitEmail}>Submit</button>
              </form>

    </section>
</div>
  );
}

export default ChangeEmail;