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
>>>>>>> 77d9667c52704910cb7b0fb591e8de6c530ff388
import './App.css';
import logInScreen from './components/LogIn';



  const App = (props) => {
    return (
      <div className="container">
          <Router>
              <Switch>
<<<<<<< HEAD

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
                      
                      <Make_Post />
                      <PrimaryNav />
                  </Route>
  
  
                  <Route path="/Profile">
                      <PrimaryNav />
                      <Profile />
                  </Route>
  
>>>>>>> 77d9667c52704910cb7b0fb591e8de6c530ff388
                  <Route path="/">
                      <PrimaryNav />
                      <Home />
                  </Route>
<<<<<<< HEAD

                  <Route path="/components/LogIn">
                      <PrimaryNav />
                      <LogIn />
                      
                  </Route>

                  

=======
  
>>>>>>> 77d9667c52704910cb7b0fb591e8de6c530ff388
              </Switch>
          </Router>
      </div>
    );
}

export default App;