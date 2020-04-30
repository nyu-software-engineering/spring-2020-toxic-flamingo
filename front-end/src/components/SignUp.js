import React, { useState } from 'react';
//import logo from './logo.svg';
//import './About.css';
import SharmonyLogo from './SharmonyLogo.PNG';
import axios from 'axios';


const SignUp = (props) => {
  const [myEmail, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userName, setUsername] = useState("");

  let dataArray = {
    email: myEmail,
    password: pass,
    username: userName
  }
  function onSubmit(e) {
    console.log("submitted!");
    e.preventDefault()
    e.stopPropagation()
    
    
    // Send request to the server
    axios.post("/signUp/", dataArray)
        .then ((response) => {
          //console.log(response);
          if (response.status === 200) {
            console.log("sign up success");
            console.log(document.cookie);
          } else {
            const error = new Error(response.error);
            throw error;
          }
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })

  }

  function handleEmail(e) {
    console.log(e.target.value);
    setEmail(e.target.value)
  }

  function handlePass(e) {
    console.log(e.target.value);
    setPass(e.target.value)
  }
    

  function handleUsername(e) {
    console.log(e.target.value);
    setUsername(e.target.value)
  }
    
    
  return (
    <div className="SignUp">

          <img alt="Sharmony Logo" src={SharmonyLogo} width="200" height="150"/>
          <form onSubmit={onSubmit}>
            Email:
            <input type="email"  onChange={handleEmail}/> 
            <br/>
            Username:
            <input type="text" onChange={handleUsername}/> 
            <br/>
            Password:
            <input type="password" onChange={handlePass}/>
            <br/>
            <br/>
            <input type="submit" value="Submit" />
          </form>
          
    </div>
     
  );
}



export default SignUp;