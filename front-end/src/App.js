import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrimaryNav from './PrimaryNav';
import Home from './Home';
import Make_Post from './Make_Post';
import Profile from './Profile';
import logo from './logo.svg';
import './App.css';
import Post from './Post';
import MainFeed from './MainFeed';
import HashtagFeed from './HashtagFeed';

import Notifications from './Notifications';




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
                      <PrimaryNav />
                      <Profile />
                  </Route>

                  <Route path="/HashtagFeed">
                      <PrimaryNav/>
                      <HashtagFeed/>
                  </Route>
  
                  <Route path="/">
                      <PrimaryNav />
                      <Notifications />
                  </Route>

                  
  
              </Switch>
          </Router>
      </div>
    );
}

export default App;