import React from 'react';
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
//import logInScreen from './logIn';
import HashtagFeed from './HashtagFeed';
import Follower from './Follower';
import Followee from './Followee';
import Harmonies from './Harmonies';
import PostComments from './PostComments';

import Notifications from './Notifications';
import CommentView from './CommentView';


const App = (props) => {
    return (
      <div className="container">
          <Router>
              <Switch>
                    <Route path="/Search">
                    <Search />
                    <PrimaryNav />
                  </Route>
                  <Route path="/Make_Post">
                    <Make_Post />
                    <PrimaryNav />
                  </Route>
  
  
                  <Route path="/PersonalProfile">
                      <PrimaryNav />
                      <PersonalProfile />
                  </Route>

                  <Route path="/Home">
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
                      <ChangeEmail />
                      <SettingsNav />
                  </Route>
                  <Route path ="/ChangePassword">
                      <ChangePassword />
                      <SettingsNav />
                  </Route>
                  <Route path ="/NotificationSettings">
                      <NotificationSettings/>
                      <SettingsNav />
                  </Route>
                  <Route path ="/Trophies">
                      <Trophies />
                      <SettingsNav />
                  </Route>
                  <Route path="/MainFeed">
                        <MainFeed />
                        <PrimaryNav />
                  </Route>
                  <Route path="/Make_Post2">
                    <Make_Post2 />
                    <PrimaryNav />
                  </Route>
                  <Route path="/Follower">
                    <Follower />
                    <PrimaryNav />
                  </Route>
                  <Route path="/Followee">
                    <Followee />
                    <PrimaryNav />
                  </Route>
                  <Route path="/Harmonies">
                    <Harmonies />
                    <PrimaryNav />
                  </Route>
                  <Route path="/Notifications">
                    <Notifications />
                    <PrimaryNav />
                  </Route> 
                  <Route path="/HashtagFeed">
                    <HashtagFeed />
                    <PrimaryNav />
                  </Route>        
                  <Route path="/PostComments/:postId">
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