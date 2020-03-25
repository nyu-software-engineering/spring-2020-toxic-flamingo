import React from 'react';
//import logo from './logo.svg';
//import './About.css';
import {NavLink} from 'react-router-dom';


const SignUp = (props) => {

  return (
    <div className="SignUp">
      <section className="SignUpForm">

          <img alt="Sharmony Logo" src="front-end\public\SharmonyLogo.PNG" />
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
          <NavLink to='/Home'>Sign Up</NavLink>
          </form>
      </section>
    </div>
  );
}

export default SignUp;