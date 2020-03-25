import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrimaryNav from './PrimaryNav';
import SettingsNav from './SettingsNav';
import Home from './Home';
import Make_Post from './Make_Post';
import Profile from './Profile';
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
                  <Route path="/Profile">
                      <Profile />
                      <PrimaryNav />
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
                      <Home />
                      <PrimaryNav />
                  </Route>
              </Switch>
          </Router>
      </div>
    );
}

export default App;