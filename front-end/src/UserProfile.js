import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import BurgerMenu from './BurgerMenu';
import './PersonalProfile.css';
import './PostPreview';
import PostPreview from './PostPreview';
// import logo from './logo.svg';
//import './About.css';


const UserProfile = (props) => {

  const [data, setData] = useState({});
  const [followStatus, setStatus] = useState(false);
  //const [showScreenOne, setScreenOne] = useState(false);
  const [followingNum, setFollowingNum] = useState();
  const [followerNum, setFollowerNum] = useState();

  //let userID = 1;
  console.log(props);
  // load in posts or whatever
  useEffect( () => {
    //fetch data
    axios.get("/user/" + "false/" + props.userID )
    .then ((response) => {
      console.log("data: " + response.data.username);
      setData(response.data);
      try {
        setFollowingNum(response.data.following.length);
      } catch {
        setFollowingNum(0);  
      }
      try {
        setFollowerNum(response.data.follower.length);
      } catch {
        setFollowerNum(0);
      }

      for (let i = 0; i < followerNum; i++){
        if (data.personalID === data.follower[i]){
          setStatus = true;
        }
      }


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

function followClicked () {
  console.log("you tryna follow them");
  axios.post("/followThisGuy" + props.userID )
  .then ((response) => {
    console.log("we got here");
    setStatus(true);
  })
}

function unfollowClicked () {
  console.log("i dont wanna follow this fool");
  axios.post("/unfollowThisGuy" + props.userID )
  .then ((response) => {
    console.log("we got here");
    setStatus(false);
  })
}

console.log(data.id);
if (!data.id) {
  return (
    <h1>Loading...</h1>
  )
} else if (!followStatus){
    return (
          <div className='Profile'>
           
            <div className="ProfileHeader">

                <div className="flex-container">
                   <img alt="Profile Picture Here" src={data.pic}  width="100" height="100"/>
                    <h1>{data.username}</h1>
                 </div>
                      <div className="bio">
                      <p>{data.bio}</p>
                      </div>
                    </div>
                      <div className='buttons'>
                          <div className='button1'>
                            <form action="/Followee">
                            <button id="following">Following {followingNum}</button>
                            </form>
                          </div>
                          <div className='button2'>
                            <form action="/Follower">
                            <button id="followers">Followers {followerNum}</button>
                            </form>
                          </div>
                          <div className='button3'>
                            <form action="/Harmonies">
                            <button id="harmonies" >Harmonies</button>
                            </form>
                          </div>
                          <div className='button4'>
                            <form >
                            <button id="Follow" onClick={followClicked}>Follow</button>
                            </form>
                          </div>
                      </div>
                      
            
        <div className="contain">
      <PostPreview userID = {data.id}/>
        </div>
      </div> 
    );
  } else if (followStatus){
    return (
      <div className='Profile'>
       
        <div className="ProfileHeader">

            <div className="flex-container">
               <img alt="Profile Picture Here" src={data.pic}  width="100" height="100"/>
                <h1>{data.username}</h1>
             </div>
                  <div className="bio">
                  <p>{data.bio}</p>
                  </div>
                </div>
                  <div className='buttons'>
                      <div className='button1'>
                        <form action="/Followee">
                        <button id="following">Following {followingNum}</button>
                        </form>
                      </div>
                      <div className='button2'>
                        <form action="/Follower">
                        <button id="followers">Followers {followerNum}</button>
                        </form>
                      </div>
                      <div className='button3'>
                        <form action="/Harmonies">
                        <button id="harmonies" >Harmonies</button>
                        </form>
                      </div>
                      <div className='button4'>
                        <form >
                        <button id="Follow" onClick={unfollowClicked}>Unfollow</button>
                        </form>
                      </div>
                  </div>
                  
        
    <div className="contain">
  <PostPreview userID = {data.id}/>
    </div>
  </div> 
);
  }
}

export default UserProfile;