import React from 'react';
import PostPreview from './PostPreview';
import BurgerMenu from './BurgerMenu';
import './PersonalProfile.css';
// import logo from './logo.svg';
//import './About.css';

const PersonalProfile = (props) => {

  return (
    <div class='Profile'>
    <div className="ProfileHeader">
     
      <div class="flex-container">
        <div class="Burger">
          <BurgerMenu />
        </div>
        <br/>
        <br/>
        <br/>
          <header class='header'>
            <div class="profilePic">
            <img alt="Profile Pic" src="https://image.edaily.co.kr/images/Photo/files/NP/S/2015/08/PS15081300024.jpg" width="100" height="100"/>
            </div>
          <h1>My Name</h1>
          <div class="bio">
          <p>this is my bio. hello</p>
          </div>
          <br/>
          <div class='buttons'>
                <button>Following</button>
                <button>Followers</button>
                <button>Harmonies</button>
          </div>
          </header>
    </div>
    </div></div>
  );
}

export default PersonalProfile;