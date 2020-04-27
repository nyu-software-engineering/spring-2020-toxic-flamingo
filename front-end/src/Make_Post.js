import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import './Make_Post.css';
import queryString from 'query-string';

// import logo from './logo.svg';
//import './About.css';

const Make_Post = (props) => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

  function submitSearch() {
    console.log("BUTTON?");
    
    axios.get("/Make_Post/" + search)
    //.then(response => JSON.parse(response))
    .then ((response) => {
      
      console.log(response.data);
      setData(response.data.tracks.items);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
    })
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    console.log("is this????")
  }

  function choose(e) {
    console.log("picked a song!!!!!!!!!!");
    console.log(e);
    // make call to the wrapper here

    props.passSongData(e);
  }

/*
// actual data from spotify 
  useEffect( () => {
    axios.get("https://api.mockaroo.com/api/36d63960?count=10&key=5296eab0")
    .then ((response) => {
      setData(response.data);

    })
    .catch(err => {
      console.log("error");
      console.log(err);
    })

  }, []);
  */
  /*const list = [];
  for(const x of data){
    list.push(<li><img src="/content-img.jpg" alt="temp"></img></li>)
    list.push(<br/>)
    list.push(<li> {x.song_name} <br/>  {x.singer}</li>);
    list.push(<br/>)
    list.push(<div class="line"></div>)
  }*/


  return (
<div className="Header">
  <div class="flex-container">
    <div class="back_button">
      <img src="/back-button.jpg" alt="where my button at"></img>
      <button class="btn"></button>
    </div>
    <div>
    <img src="/temp-logo.jpg" alt="logo plz" width="200" height="50"></img>
    </div>
    <div>
    <form action="/Make_Post2">
    <input type="submit" value="Next" />
    </form>
    </div>
  </div>

  <div className="SearchBar">
    <input type="text" placeholder="Search (Artist, Title, Album):" onChange={handleSearch}></input>
    <button onClick={submitSearch}>Submit</button>
  </div>



  <div class="flex-container">
  <div className="Spotify"><button class="company">Spotify</button></div>
  <div className="SoundCloud"><button class="company">SoundCloud</button></div>
  </div>
 
 
  <div className="content"> 
    {data.map((jsonObj,i) => (
          <div class ="post" key={i.toString()} onClick={(jsonObj) => choose(jsonObj)}>  
          <img src="/content-img.jpg" alt="temp"></img>
          <p>{jsonObj.artists.map((artist, i) => {return artist.name + ", "})}, {jsonObj.name}</p>
          <br/>
          <div class="line"></div>
          </div>
          
        ))}
    </div>

  <div className="nav_bar"> 
    <div class="flex-container">
      <nav>
        <ul class ="nav_link"> 
          <li><a href="/MainFeed">Home</a></li>
          <li><a href="#">Search</a></li>
          <li><a href="/Make_Post">New Post</a></li>
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