import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import BurgerMenu from './BurgerMenu';
import {Redirect, withRouter} from 'react-router-dom';
import './UserProfile.css';
import './PostPreview';
import PostPreview from './PostPreview';
//import { parseWithoutProcessing } from 'handlebars';
// import logo from './logo.svg';
//import './About.css';


const UserProfile = (props) => {

  let username = props.match.params.username;
  
  console.log("AHHHHHHHHH " + props.userID);

  const [data, setData] = useState({});
  const [followUserID, setFollowUserID] = useState(false);
  //const [showScreenOne, setScreenOne] = useState(false);
  const [followingNum, setFollowingNum] = useState();
  const [followerNum, setFollowerNum] = useState();
  //const [isFollowing, setIsFollowing] = useState();

  let userID;
  const [followunfollow, setFollowUnfollow] = useState();
  const [shouldPersonalRedirect, setPersonalRedirect] = useState(false);
  const [shouldFollowerRedirect, setFollowerRedirect] = useState(false);
  const [shouldFollowingRedirect, setFollowingRedirect] = useState(false);
  
  const [shouldHarmoniesRedirect, setHarmoniesRedirect] = useState(false);
  // load in posts or whatever
  useEffect( () => {
    axios.get(process.env.REACT_APP_BACKEND + "/getUserID/" + username, {withCredentials: true}).then ((res) => {
      userID = res.data;
      console.log(userID);
      setFollowUserID(userID);
      axios.get(process.env.REACT_APP_BACKEND + "/isPersonal/" + userID, {withCredentials: true}).then((res) => {
      if(res.data) {
        setPersonalRedirect(true);
      } else {
      
      axios.get(process.env.REACT_APP_BACKEND + "/user/" + "false/" + userID, {withCredentials: true})

    .then ((response) => {
      console.log("data: " + response.data.username);
      setData(response.data);
      console.log('printing'+ response.data);
      try {
        console.log("following: " + response.data.following.length);
        setFollowingNum(response.data.following.length);
      } catch {
        console.log("catching an error in counting");
        setFollowingNum(0);  
      }
      console.log(response.data.follower.length);
      try {
        setFollowerNum(response.data.follower.length);
        
      } catch {
        console.log("bad follower error");
        setFollowerNum(0);
      }

      if (response.data.isFollowing){
        console.log("please work");
        setFollowUnfollow("Unfollow");
      } else {
        console.log(response.data.isFollowing);
        setFollowUnfollow("Follow");
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
    }}).catch( err => {
      console.log("ERROR!");
      console.error(err);
    })
    }).catch( err => {
      console.log("ERROR!");
      console.error(err);
    })
}, []);

if (shouldPersonalRedirect) {
  return <Redirect push to='/PersonalProfile/'/>
}

if (shouldFollowerRedirect) {
  return <Redirect push to='/Follower/'/>
}

if (shouldFollowingRedirect) {
  return <Redirect push to='/Followee/'/>
}

if (shouldHarmoniesRedirect) {
  return <Redirect push to='/Harmonies/'/>
}



function followClicked (e) {
  e.preventDefault();
  if (followunfollow == "Unfollow"){
    console.log('you tryna unfollow?');
    axios.get(process.env.REACT_APP_BACKEND + "/unfollowThisGuy/"+followUserID, {withCredentials: true})
    .then ((response) => {
      setFollowUnfollow("Follow");
      setFollowerNum(followerNum - 1);
      console.log(response);
      console.log("we unfollowed them");
      
    })
  } else {
    console.log("you tryna follow them");
    axios.get(process.env.REACT_APP_BACKEND + "/followThisGuy/"+followUserID, {withCredentials: true})
    .then ((response) => {
      setFollowUnfollow("Unfollow");
      setFollowerNum(followerNum + 1);
      if (response.status == 200){
      console.log(response);
      console.log("we got here");
      } else {
        console.log('oh no i think you follow them already');
      }
    })
  }
}



//console.log(data.id);
if (!data.id) {
  return (
    <h1>Loading...</h1>
  )

} else {
    return (
          <div className='Profile'>
            <div className="ProfileHeader">

                <div className="flex-container">

                <img className="PictureInProfile" alt="Profile Picture Here" src={data.pic}  width="100" height="100"/>
                  <div className="UserNameAndBio"> <h1>{data.username}</h1> <div className="bio"><p>{data.bio}</p> </div></div>
                </div>
            </div>
                      <div className='buttons'>

                          
                            
                            <button className='button1' id="following" onClick={() => {
                              props.passUser(data.id)
                              setFollowingRedirect(true)
                              }}>Following {followingNum}</button>
                          
                            <button className='button1' id="followers" onClick={() => {
                              props.passUser(data.id)
                              setFollowerRedirect(true);
                              }}>Followers {followerNum}</button>
                          

                            
                            <button className='button1' id="harmonies" onClick={() => {
                             props.passUser(data.id)
                             setHarmoniesRedirect(true);
                            }}>Harmonies</button>
                            
                     

                            <div className='follow'>
                            <button className='followbutton' id="follow" onClick={followClicked}>{followunfollow}</button>
                         </div>
                           

                      </div>
                      
            
        <div className="contain">
      <PostPreview userID = {data.id}/>
        </div>
      </div> 
    );

  }
}


export default withRouter(UserProfile);