import React from 'react';
import './Make_Post.css';
// import logo from './logo.svg';
//import './About.css';

const Make_Post = (props) => {
  const buttonText = 'Click Me!';


  return (
<div className="Header">
  <div class="flex-container">
    <div class="back_button">
      <img src="/back-button.jpg" alt="where my button at"></img>
      <button class="btn">a</button>
    </div>
    <div>
    <img src="temp-logo.jpg" alt="logo plz" width="150" height="50"></img>
    </div>
    <div>
    <button class="buttton_next">Next</button>
    </div>
  </div>

  <div className="SearchBar">
    <input type="text" placeholder="Search (Artist, Title, Album):"></input>
  </div>
  <div class="flex-container">
  <div className="Spotify"><button class="company">Spotify</button></div>
  <div className="SoundCloud"><button class="company">SoundCloud</button></div>
  </div>
  <div className="content"> music content</div>

  <div className="nav_bar"> 
    <div class="flex-container">
      
    </div>
    </div>
  

</div>
/*
<div className="searchBar"> 
this.props.history.push('/') //this will go to home page

or

this.props.history.goBack() //this will go to previous page
</div>
<div className="select_type">

</div>
<div className="post">

</div>
<div className="nav_Bar">

</div>
*/
  );
}

export default Make_Post;