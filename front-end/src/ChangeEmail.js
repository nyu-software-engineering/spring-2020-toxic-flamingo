import React, {useState, useEffect, Component} from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import "./ChangeEmail.css";
const ChangeEmail = (props) => {
  const [data, setData] = useState("");
  const userId = "5ea5f57f46ba2e699831ae3f";
  function submitEmail(e) {
    console.log(data)
    axios.get("/changeEmail/"+ data)
        .then ((response) => {
            setData(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
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
              <NavLink to="/MainFeed">
                <button onClick={submitEmail}>Submit</button>
              </NavLink>
              </form>

    </section>
</div>
  );
}

export default ChangeEmail;