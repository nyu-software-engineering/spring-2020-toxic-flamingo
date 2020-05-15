import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import BurgerMenu from './BurgerMenu';
import './PersonalProfile.css';
import './PostPreview';
import PostPreview from './PostPreview';
// import logo from './logo.svg';
//import './About.css';


const UserProfile = (props) => {


  
  console.log("AHHHHHHHHH " + props.userID);

  const [data, setData] = useState({});
  //const [showScreenOne, setScreenOne] = useState(false);
  const [followingNum, setFollowingNum] = useState();
  const [followerNum, setFollowerNum] = useState();
  const [isFollowing, setIsFollowing] = useState();

  let userID = props.userID;
  const [followunfollow, setFollowUnfollow] = useState();
 
  console.log("imma prop" + userID);
  // load in posts or whatever
  useEffect( () => {
    //fetch data
    axios.get("/user/" + "false/" + userID )

    .then ((response) => {
      console.log("data: " + response.data.username);
      setData(response.data);
      console.log('prinring'+ response.data);
      try {
        console.log(response.data.following.length);
        setFollowingNum(response.data.following.length);
      } catch {
        console.log("catching an error in counting");
        setFollowingNum(0);  
      }
      try {
        setFollowerNum(response.data.follower.length);
      } catch {
        setFollowerNum(0);
      }

     console.log('about to loop');
     try {
      for(let i = 0; i < followerNum; i++){
        console.log('im in the loop');
        if (data.personalID == response.data.follower[i]){
          console.log('printing cuz idk whats going on:' + data);
          setIsFollowing(true);
        }
      }
      } catch{
        console.log('oh no!');
      }
      if (isFollowing){
        setFollowUnfollow("Unfollow");
      } else {
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

    
}, []);

function followClicked (e) {
  e.preventDefault();
  if (isFollowing){
    console.log('you tryna unfollow?');
    axios.get("/unfollowThisGuy/"+props.userID)
    .then ((response) => {
      console.log(response);
      console.log("we unfollowed them");
      
    })
  } else {
    console.log("you tryna follow them");
    axios.get("/followThisGuy/"+props.userID)
    .then ((response) => {
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
            <BurgerMenu right pageWrapID={"ProfileHeader"} outerContainerID={"outer-container"}/>
            <div className="ProfileHeader">
                
                <div className="flex-container">
                    <img src={data.pic} alt="profile pic" width="100" height="100"/>
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

                            <form action="/Follow">
                            <button id="follow" onClick={followClicked}>{followunfollow}</button>
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