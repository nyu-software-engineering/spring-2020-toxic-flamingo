import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import SharmonyLogo from './SharmonyLogo.PNG';
import {Redirect} from 'react-router';
import './logIn.css';

import axios from 'axios';


const LogIn = (props) => {

  const [userID, setUserID] = useState("");
  const [shouldRedirect, setRedirect] = useState(false);

  useEffect( () => {
    //fetch data

    axios.get("/status")
    .then ((response) => {

        console.log(response.data);

        if (!response.data) {
          return;
        }

        console.log(response.data.sub);
        
        setUserID(response.data.sub);
        setRedirect(true);
    })
    .catch( err => {
        console.log("ERROR!");
        console.error(err);
    })
    
}, []);

  const [pass, setPass] = useState("");
  const [userName, setUsername] = useState("");
  

  let dataArray = {
    password: pass,
    username: userName
  }
  function onSubmit(e) {
    console.log("submitted!");
    e.preventDefault()
    //e.stopPropagation()
    
    
    // Send request to the server
    axios.post("/logIn/", dataArray, {withCredentials: true})
        .then ((response) => {
          //console.log(response);
          if (response.status === 200) {
            console.log("log in success");
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


  function handlePass(e) {
    console.log(e.target.value);
    setPass(e.target.value)
  }
    

  function handleUsername(e) {
    console.log(e.target.value);
    setUsername(e.target.value)
  }
    

  if (shouldRedirect) {
    return <Redirect push to='../MainFeed/'/>
  }

    return (
      <div className="LogIn">
          <h1>Welcome to Sharmony!</h1>
          <section className="logInForm">

              <img alt="Sharmony Logo" src={SharmonyLogo} width="200" height="150" />
              <form onSubmit={onSubmit}>
              <p>Username: </p>
              <input type='text' name='username' onChange={handleUsername} />
              <br/>
              <p>Password: </p>
              <input type='password' name='password' onChange={handlePass}/>
              <br/>
              <br/>
              <div className='buttons'>
                <input type="submit" value="Submit"/>
                <br/>
                <NavLink to="/SignUp">SignUp</NavLink>
              </div>
              </form>
          </section>
      </div>
    );
  }



  export default LogIn;
