import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import BurgerMenu from './BurgerMenu';
import './PersonalProfile.css';
// import logo from './logo.svg';
//import './About.css';

const PersonalProfile = (props) => {

  const [data, setData] = useState([]);
  //const personal = true;

  // load in posts or whatever
  useEffect( () => {
    //fetch data
    axios.get("/loadProfile")
    .then ((response) => {
      setData(response.data);
    })
    .catch( err => {
        console.log("ERROR!");
        console.error(err);

        //fake backup data
        const backupData = [
            {
                id: 1,
                username: "kanyelover70",
                name: "Kanye Fan",
                bio: "Welcome to the good life, the life i live!",
                followers: 200,
                following: 265
            }
        ];
        setData(backupData);
    })
    
}, []);



    return (
      <div>
      {data.map((jsonObj, i) => (
    
          <div class='Profile'>
          <div className="ProfileHeader">
          
            <div class="flex-container">
              <div class="Burger">
                <BurgerMenu />
              </div>
              
                <header class='header'>
                  <div class="profilePic">
                  <img alt="Profile Pic" src={jsonObj.picture} width="100" height="100"/>
                  </div>
                <h1>{jsonObj.name}</h1>
                <div class="bio">
                <p>{jsonObj.bio}</p>
                </div>
                <br/>
                <div class='buttons'>
                      <button>Following {jsonObj.following}</button>
                      <button>Followers {jsonObj.followers}</button>
                      <button>Harmonies</button>
                </div>
                </header>
          </div>
          </div></div>
      ))}
      </div>
    );
 }
  

export default PersonalProfile;