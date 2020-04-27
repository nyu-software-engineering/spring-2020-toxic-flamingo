import React, { useState } from 'react';
//import logo from './logo.svg';
//import './About.css';
import SharmonyLogo from './SharmonyLogo.PNG';


function onSubmit() {

}

const SignUp = (props) => {
  const entry = useState({
    email: "",
    username: "",
    password: ""
  });



  return (
    <div className="SignUp">

          <img alt="Sharmony Logo" src={SharmonyLogo} width="200" height="150"/>
          <form>
            Email:
            <input type="email" value={entry.email} /> 
            <br/>
            Username:
            <input type="text" value={entry.email}  /> 
            <br/>
            Password:
            <input type="password" value={entry.email} />
            <br/>
            <br/>
            <input type="submit" value="Submit" onSubmit={onSubmit}/>
          </form>
          
    </div>
     
  );
}



export default SignUp;