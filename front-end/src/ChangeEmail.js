import React, {useState, useEffect, Component} from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import "./ChangeEmail.css";
import BurgerMenu from './BurgerMenu';


const ChangeEmail = (props) => {
  const [data, setData] = useState("");
  let dataArray = {
    email: data,
    userID: "5eab5536cfcc1f47a02d55cf"
  }
  function submitEmail(e) {
    e.preventDefault();
    console.log(data)
    axios.post(process.env.REACT_APP_BACKEND + "/changeEmail/", dataArray, {withCredentials: true})
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
    <div>
      <BurgerMenu right pageWrapID={"ProfileHeader"} outerContainerID={"outer-container"}/>
    
<div className="ChangeEmail">
    <h1>Change Email</h1>
    <section className="main-content">
        <img alt="about us" className="icon" src="https://cdn1.iconfinder.com/data/icons/e-mail-11/48/Change-Mail-Email-Letter-Communication-512.png" />
        <form>
          <div>
              <p>Enter your new email: </p>
              <input className='newEmail' type='text' name='email' onChange={handleData} />
            </div>  
                <button className='button1' onClick={submitEmail}>Submit</button>
              </form>

    </section>
</div></div>
  );
}

export default ChangeEmail;