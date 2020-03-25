import React from 'react';
import './Make_Post.css';
import data from './MOCK_DATA';
// import logo from './logo.svg';
//import './About.css';

const Make_Post = (props) => {

  const list = [];
  for(const x of data){
    list.push(<li><img src="/content-img.jpg" alt="temp"></img></li>)
    list.push(<br/>)
    list.push(<li> {x.song_name} <br/>  {x.singer}</li>);
    list.push(<br/>)
  }


  return (
<div className="Header">
  <div class="flex-container">
    <div class="back_button">
      <img src="/back-button.jpg" alt="where my button at"></img>
      <button class="btn">a</button>
    </div>
    <div>
    <img src="/temp-logo.jpg" alt="logo plz" width="150" height="50"></img>
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
 
 
  <div className="content"> 
    {list} 
    </div>

  <div className="nav_bar"> 
    <div class="flex-container">
      <nav>
        <ul class ="nav_link"> 
          <li><a href="#">Home</a></li>
          <li><a href="#">Search</a></li>
          <li><a href="#">New Post</a></li>
          <li><a href="#">Notifications</a></li>
        </ul>
      </nav>
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