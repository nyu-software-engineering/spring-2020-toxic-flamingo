import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
<<<<<<< HEAD
import PrimaryNav from './components/PrimaryNav';
import Home from './components/Home';
import makePost from './components/makePost';
import Profile from './components/Profile';
//import Sharmony logo from './logo.svg';
=======
import PrimaryNav from './PrimaryNav';
import Home from './Home';
import Make_Post from './Make_Post';
import Profile from './Profile';
import logo from './logo.svg';
>>>>>>> ba7d2e4df7ad706c3b11416925c122197c47e7b0
import './App.css';
import logInScreen from './components/logIn';



<<<<<<< HEAD

=======
>>>>>>> ba7d2e4df7ad706c3b11416925c122197c47e7b0
  const App = (props) => {
    return (
      <div className="container">
          <Router>
              <Switch>
<<<<<<< HEAD

                  <Route path="/components/logIn">
                      <PrimaryNav />
                      <logInScreen />
                      
                  </Route>
  
                  <Route path="/components/Make_Post">
                      <PrimaryNav />
                      <makePost />
                  </Route>
  
  
                  <Route path="/components/Profile">
                      <PrimaryNav />
                      <Profile />
                  </Route>


=======
  
                  <Route path="/Make_Post">
                      <PrimaryNav />
                      <Make_Post />
                  </Route>
  
  
                  <Route path="/Profile">
                      <PrimaryNav />
                      <Profile />
                  </Route>
  
>>>>>>> ba7d2e4df7ad706c3b11416925c122197c47e7b0
                  <Route path="/">
                      <PrimaryNav />
                      <Home />
                  </Route>
<<<<<<< HEAD

                  

=======
  
>>>>>>> ba7d2e4df7ad706c3b11416925c122197c47e7b0
              </Switch>
          </Router>
      </div>
    );
}

export default App;