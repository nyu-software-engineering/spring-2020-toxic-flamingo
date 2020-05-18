import React, { useState } from 'react';
//import logo from './logo.svg';
//import './About.css';
import SharmonyLogo from './SharmonyLogo.PNG';
import axios from 'axios';
import {Redirect} from 'react-router';
import './SignUp.css';

const SignUp = (props) => {
  const [myEmail, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userName, setUsername] = useState("");
  const [shouldRedirect, setshouldRedirect] = useState(false);

  let dataArray = {
    email: myEmail,
    password: pass,
    username: userName
  }
  function onSubmit(e) {
    console.log("submitted!");
    e.preventDefault()
    //e.stopPropagation()
    
    
    // Send request to the server
    axios.post("/signUp/", dataArray, {withCredentials: true})
        .then ((response) => {
          //console.log(response);
          if (response.status === 200) {
            console.log("sign up success");
            setshouldRedirect(true);
            //console.log(response);
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
  if(shouldRedirect) {
  return <Redirect push to='../MainFeed/'/>  
  }
  else{
  return (
    <div className="SignUp">
        <div className="logo">
          <img alt="Sharmony Logo" src={SharmonyLogo} width="200" height="150"/>
        </div>
          <form className="form" onSubmit={onSubmit}>
            <p>Email:</p>
            <input type="email"  onChange={handleEmail}/> 
            <br/>
            <p>Username:</p>
            <input type="text" onChange={handleUsername}/> 
            <br/>
            <p>Password:</p>
            <input type="password" onChange={handlePass}/>
            <br/>
            <br/>
            <input className='button1' type="submit" value="Submit" />
          </form>
          
    </div>
     
  );
  }
}



export default SignUp;