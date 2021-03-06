import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrimaryNav from './PrimaryNav';
import SettingsNav from './SettingsNav';
import Home from './Home';
import Search from './Search';
import Make_Post from './Make_Post';
import PersonalProfile from './PersonalProfile';
import LogIn from './components/logIn';
import SignUp from './components/SignUp';
import Settings from './Settings';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import NotificationSettings from './NotificationSettings';
import Trophies from './Trophies';
import Make_Post2 from './Make_Post2';
import logo from './logo.svg';
import './App.css';
import MainFeed from './MainFeed';
import HashtagFeed from './HashtagFeed';
import Follower from './Follower';
import Followee from './Followee';
import Harmonies from './Harmonies';
import PostComments from './PostComments';
import Notifications from './Notifications';
import SharmonyHeader from './SharmonyHeader';
import MakePostWrapper from './MakePostWrapper';
import UserProfile from './UserProfile';


const App = (props) => {
  const [userID, setUserID] = useState("");
  const [myPic, setMyPic] = useState("");

  function passUser(userID) {
    console.log("PASSING USER ID " + userID);
    setUserID(userID);

  }

    return (
      <div className="container">
          <Router>
              <Switch>
                    <Route path="/Search/">
                    <SharmonyHeader/>
                    <Search passUser={(userID) => passUser(userID)}/>
                    <PrimaryNav />
                  </Route>
                  <Route path="/Make_Post">
                    <SharmonyHeader />
                    <MakePostWrapper showScreenOne={true}/>
                    <PrimaryNav />
                  </Route>
                  <Route path="/MainFeed">
                    <SharmonyHeader />
                    <MainFeed/>
                    <PrimaryNav />
                  </Route>
                  <Route path="/HashtagFeed/:hashtag">
                    <SharmonyHeader/>
                    <HashtagFeed/>
                    <PrimaryNav />
                  </Route>
                  <Route path="/PostComments/:postID">
                    <SharmonyHeader/>
                    <PostComments />
                    <PrimaryNav />
                  </Route>
                  <Route path="/user">
                      <SharmonyHeader />
                      <PrimaryNav />
                      <UserProfile />
                  </Route>

                  <Route path="/PersonalProfile">
                      <SharmonyHeader />
                      <PrimaryNav />
                      <PersonalProfile passUser={(userID) => passUser(userID)}/>
                  </Route>

                  <Route path="/UserProfile/:username">
                      <SharmonyHeader />
                      <PrimaryNav />
                      <UserProfile passUser={(userID) => passUser(userID)}/>
                  </Route>

                  <Route path="/Home">
                      <SharmonyHeader />
                      <PrimaryNav />
                      <Home/>
                  </Route>

                  <Route path="/SignUp">
                      <SignUp/>
                  </Route>
                  <Route path ="/Settings">
                      <Settings />
                      <PrimaryNav />
                  </Route>
                  <Route path ="/ChangeEmail">
                      <SharmonyHeader />
                      <ChangeEmail />
                      <SettingsNav />
                  </Route>
                  <Route path ="/ChangePassword">
                  <SharmonyHeader />
                      <ChangePassword />
                      <SettingsNav />
                  </Route>
                  <Route path ="/NotificationSettings">
                  <SharmonyHeader />
                      <NotificationSettings/>
                      <SettingsNav />
                  </Route>
                  <Route path ="/Trophies">
                  <SharmonyHeader />
                      <Trophies />
                      <SettingsNav />
                  </Route>
                  
                  <Route path="/Make_Post2">
                  <SharmonyHeader />
                  <MakePostWrapper showScreenOne={false}/>
                    <PrimaryNav />
                  </Route>
                  <Route path="/Follower">
                  <SharmonyHeader />
                    <Follower userID={userID}/>
                    <PrimaryNav />
                  </Route>
                  <Route path="/Followee">
                  <SharmonyHeader />
                    <Followee userID={userID}/>
                    <PrimaryNav />
                  </Route>
                  <Route path="/Harmonies">
                  <SharmonyHeader />
                    <Harmonies userID={userID}/>
                    <PrimaryNav />
                  </Route>
                  <Route path="/Notifications">
                    <SharmonyHeader />
                    <Notifications />
                    <PrimaryNav />
                  </Route>      
                  <Route path="/PostComments/:postId">
                   <SharmonyHeader />
                    <PostComments />
                    <PrimaryNav />
                  </Route>                                  
                  <Route path="/">
                      <LogIn />
                </Route>
              </Switch>
          </Router>
      </div>
    );
}

export default App;