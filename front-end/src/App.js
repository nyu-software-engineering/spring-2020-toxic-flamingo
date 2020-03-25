import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrimaryNav from './PrimaryNav';
import Home from './Home';
import Make_Post from './Make_Post';
import PersonalProfile from './PersonalProfile';
import LogIn from './components/logIn';
import SignUp from './components/SignUp';
import logo from './logo.svg';
import './App.css';




  const App = (props) => {
    return (
      <div className="container">
          <Router>
              <Switch>

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
  
                  <Route path="/">
                      <LogIn />
                  </Route>
  
              </Switch>
          </Router>
      </div>
    );
}

export default App;