
import React from 'react';
import {NavLink} from 'react-router-dom';
import SharmonyLogo from './SharmonyLogo.PNG';
import './logIn.css';


const LogIn = (props) => {
    return (
      <div className="LogIn">
          <h1>Welcome to Sharmony!</h1>
          <section className="logInForm">

              <img alt="Sharmony Logo" src={SharmonyLogo} width="200" height="150" />
              <form>
              <p>Username: </p>
              <input type='text' name='username' />
              <br/>
              <p>Password: </p>
              <input type='password' name='password'  />
              <br/>
              <br/>
              <div className='buttons'>
                <NavLink to="/MainFeed">LogIn</NavLink>
                <br/>
                <NavLink to="/SignUp">SignUp</NavLink>
              </div>
              </form>
          </section>
      </div>
    );
  }



  export default LogIn;
