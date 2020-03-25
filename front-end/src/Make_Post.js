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
          <img src="/back-button.jpg" alt="where my button at"width="50" height="50"></img>
          <button class="btn"></button>
        </div>
        <div>
        <img src="temp-logo.jpg" alt="logo plz"></img>
        </div>
        <div>
        <button class="buttton_next">Next</button>
        </div>
      </div>

      <div className="search_bar">
        <button class="search_btn">Search (Artist, Title, Album): </button>
      </div>

      <div className="Spotify">Spotify and SoundCloud bar here</div>

      <div className="content"> music content</div>

      <div className="nav_bar"> 4 nav bar here</div>
      

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