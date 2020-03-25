import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrimaryNav from './PrimaryNav';
import SettingsNav from './SettingsNav';
import Home from './Home';
import Make_Post from './Make_Post';
import PersonalProfile from './PersonalProfile';
import LogIn from './components/logIn';
import SignUp from './components/SignUp';
import Settings from './Settings';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import NotificationSettings from './NotificationSettings';
import Trophies from './Trophies';
import logo from './logo.svg';
import './App.css';
//import logInScreen from './logIn';

const App = (props) => {
    return (
      <div className="container">
          <Router>
              <Switch>

                  <Route path="/Make_Post">
                    <Make_Post />
                    <PrimaryNav />
                  </Route>
<<<<<<< HEAD
                  <Route path="/Profile">
                      <Profile />
                      <PrimaryNav />
=======
  
  
                  <Route path="/PersonalProfile">
                      <PrimaryNav />
                      <PersonalProfile />
>>>>>>> kaybranchnew
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
                  <Route path="/">
                      <LogIn />
                </Route>
              </Switch>
          </Router>
      </div>
    );
}

export default App;