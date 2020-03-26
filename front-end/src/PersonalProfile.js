import React from 'react';
import PostPreview from './PostPreview';
import BurgerMenu from './BurgerMenu';
import './PersonalProfile.css';
// import logo from './logo.svg';
//import './About.css';

const PersonalProfile = (props) => {

  return (
    <div className="ProfileHeader">
      <div class="Burger">
        <BurgerMenu />
      </div>
      <div class="flex-container">
              <img alt="Profile Pic" src="https://image.edaily.co.kr/images/Photo/files/NP/S/2015/08/PS15081300024.jpg" width="100" height="100"/>
             
              <h1>My Name</h1>
            
      </div>
      <br />
      <p>this is my bio. hello</p>
      <br/>
              <button>Following</button>
              <button>Followers</button>
              <button>Harmonies</button>
      <div class='preview'>
      <PostPreview />
      </div>
    </div>
    
  );
}

export default PersonalProfile;