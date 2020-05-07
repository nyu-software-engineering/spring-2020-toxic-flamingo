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

const PersonalProfile = (props) => {

  const [data, setData] = useState([]);
  let userID = 1;
  console.log(props);
  // load in posts or whatever
  useEffect( () => {
    //fetch data
    axios.get("/user/"+userID)
    .then ((response) => {
      console.log(response.data);
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
          
     
          <div className='Profile'>
            <BurgerMenu right pageWrapID={"ProfileHeader"} outerContainerID={"outer-container"}/>
            <div className="ProfileHeader">
            
                <div className="flex-container">
                    <h1>{jsonObj.name}</h1>
                 </div>
                      <div className="bio">
                      <p>{jsonObj.bio}</p>
                      </div>
                    </div>
                      <div className='buttons'>
                          <div className='button1'>
                            <form action="/Followee">
                            <button id="following">Following {jsonObj.following}</button>
                            </form>
                          </div>
                          <div className='button2'>
                            <form action="/Follower">
                            <button id="followers" onClick={handleFollowersClick(jsonObj.id)}>Followers {jsonObj.followers}</button>
                            </form>
                          </div>
                          <div className='button3'>
                            <form action="/Harmonies">
                            <button id="harmonies" >Harmonies</button>
                            </form>
                          </div>
                            
                      </div>
                      
            </div>
         
          ))}
        <div className="contain">
      <PostPreview />
        </div>
      </div> </div>
    );
 }
  

export default PersonalProfile;