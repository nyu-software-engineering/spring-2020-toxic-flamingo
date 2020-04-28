import React, { useState } from 'react';
//import logo from './logo.svg';
//import './About.css';
import SharmonyLogo from './SharmonyLogo.PNG';
import axios from 'axios';


const SignUp = (props) => {
  const [data, setData] = useState("");

  function onSubmit(e) {
    console.log("submitted!");
    e.preventDefault()
    e.stopPropagation()
    
    
    // Send request to the server
    axios.post("/signUp/"+ data)
        .then ((response) => {
          console.log(response);
          if (response.status === 200) {
            this.props.history.push('/MainFeed');
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

  function handleData(e) {
    console.log(e.target.value);
    setData(e.target.value)
  }
    
  return (
    <div className="SignUp">

          <img alt="Sharmony Logo" src={SharmonyLogo} width="200" height="150"/>
          <form onSubmit={onSubmit} onChange={handleData}>
            Email:
            <input type="email" value={data.email} /> 
            <br/>
            Username:
            <input type="text" value={data.username}  /> 
            <br/>
            Password:
            <input type="password" value={data.password} />
            <br/>
            <br/>
            <input type="submit" value="Submit" />
          </form>
          
    </div>
     
  );
}



export default SignUp;