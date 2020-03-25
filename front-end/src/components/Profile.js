import React from 'react';
// import logo from './logo.svg';
//import './About.css';

const Profile = (props) => {

  return (
      <div className="ProfileHeader">
          <h1>My Name</h1>
          <img alt="Profile Pic" src="https://image.edaily.co.kr/images/Photo/files/NP/S/2015/08/PS15081300024.jpg" />
          <p>this is my bio. hello</p>
          <button>Following</button>
          <button>Followers</button>
          <button>Harmonies</button>
      </div>
      
  );
}

export default Profile;