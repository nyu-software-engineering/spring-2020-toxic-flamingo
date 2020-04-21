import React from 'react';
//import logo from './logo.svg';
//import './About.css';
import {NavLink} from 'react-router-dom';
import SharmonyLogo from './SharmonyLogo.PNG';


const SignUp = (props) => {

  return (
    <div className="SignUp">

          <img alt="Sharmony Logo" src={SharmonyLogo} width="200" height="150"/>
          <form>
          <p>Enter the info below:
          </p> 
          <br/>
        <br/>
          <p>Username:</p>
          <input type='text' name='username' />
          <br/>
          <p>Password: </p>
          <input type='password' name='password' />
          <br/>
          <p>Confirm Password: </p>
          <input type='password' name='password' />
          <br/>
          <p>Email Address:</p>
          <input type='email' name='email' />
          <br/>
          <NavLink to='/MainFeed'>Sign Up</NavLink>
          </form>
    </div>
  );
}

export default SignUp;