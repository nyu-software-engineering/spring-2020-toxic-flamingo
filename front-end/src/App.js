import React from 'react';
<<<<<<< HEAD
import ZipForm from './components/ZipForm';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <ZipForm />
      </div>
    );
  }
=======
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrimaryNav from './PrimaryNav';
import Home from './Home';
import Make_Post from './Make_Post';
import Profile from './Profile';
import logo from './logo.svg';
import './App.css';



  const App = (props) => {
    return (
      <div className="container">
          <Router>
              <Switch>
  
                  <Route path="/Make_Post">
                      <PrimaryNav />
                      <Make_Post />
                  </Route>
  
  
                  <Route path="/Profile">
                      <PrimaryNav />
                      <Profile />
                  </Route>
  
                  <Route path="/">
                      <PrimaryNav />
                      <Home />
                  </Route>
  
              </Switch>
          </Router>
      </div>
    );
>>>>>>> 70c84f031be5ff4b8768d0c4a8845fefa11fa381
}

export default App;