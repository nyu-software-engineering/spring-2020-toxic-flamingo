import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import BurgerMenu from './BurgerMenu';
import './PersonalProfile.css';
import './PostPreview';
import PostPreview from './PostPreview';
// import logo from './logo.svg';
//import './About.css';

const handleFollowersClick = (id) => {
  axios.post('/user.:userID/followers', id)
  .then(()=>console.log('going to followers'))
  .catch(err => {console.log('followers error');
  });
}

const UserProfile = (props) => {

  const [data, setData] = useState([]);
  const userID = 1;

  // load in posts or whatever
  useEffect( () => {
    //fetch data
    axios.get("/userID/"+userID)
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
                pic: "https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg",
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
        <div>
      {data.map((jsonObj, i) => (
          
     
          <div class='Profile'>
           
            <div class="ProfileHeader">
            
                <div class="flex-container">
                      <div class="profilePic">
                      <img alt="Profile Pic" src={jsonObj.pic} width="100" height="100"/>
                      </div>
                    <h1>{jsonObj.name}</h1>
                 </div>
                      <div class="bio">
                      <p>{jsonObj.bio}</p>
                      </div>
                    </div>
                      <div class='buttons'>
                            <button id="following">Following {jsonObj.following}</button>
                            <button id="followers" onClick={handleFollowersClick(jsonObj.id)}>Followers {jsonObj.followers}</button>
                            <button id="harmonies" >Harmonies</button>
                      </div>
              
            </div>
         
      ))}
      <PostPreview />
      </div> </div>
    );
 }
  

export default UserProfile;