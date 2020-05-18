import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import UserSearchTile from './UserSearchTile';
import TagSearchTile from './TagSearchTile';
import './Search.css';
import HashtagFeed from './HashtagFeed';
import { Redirect } from 'react-router-dom';
// import logo from './logo.svg';
//import './About.css';

const Search = (props) => {
  console.log(props.userID);
  const [data, setData] = useState([]);

  const [searchUsers, setSearchUsers] = useState(true);
  const [searchQuery, setQuery] = useState("");

  const [clicked, setClicked] = useState(false); //when tag tile is clicked
  const [tag, setTag] = useState(""); // tag state variable

  // useEffect( () => {
  //   axios.get("/Search/" + searchUsers)
  //   .then ((response) => {
  //     setData(response.data);
  //   })
  //   .catch(err => {
  //     console.log("error");
  //     console.log(err);
  //   })
    
  // }, []);

  /*const list = [];
  for(const x of data){
    list.push(<li><img src="/content-img.jpg" alt="temp"></img></li>)
    list.push(<br/>)
    list.push(<li> {x.song_name} <br/>  {x.singer}</li>);
    list.push(<br/>)
    list.push(<div class="line"></div>)
  }*/

  function handleChange(e) {
    setQuery(e.target.value)
  }

  function sendSearch(e) {
    e.preventDefault();

    if (searchQuery.trim() == "") {
      // NO COMMENT IN THE BOX

      console.log("NOPE");
      return;
  }
    console.log("searchUsers = " + searchUsers);
    console.log(searchQuery);

    axios.get("/Search/" + searchUsers + "/" + searchQuery)
    .then(result => {

      setData(result.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function selectTag(tag) {
    setTag(tag);
    setClicked(true);
  }

  if (clicked) {
    return (
        <Redirect push to={"HashtagFeed/" + tag}/>
    )
}

  return (
    <div className="Search">
<div className="Header">
  <div class="flex-container">
    <div class="back_button">
      <img src="/back-button.jpg" alt="where my button at"></img>
      <button class="btn"></button>
    </div>
    <div>
    <img src="/temp-logo.jpg" alt="logo plz" width="200" height="50"></img>
    </div>
  </div>

  <div className="SearchBar">
    <form onSubmit={sendSearch}>
      <input type="text" placeholder="Search:" onChange={handleChange} ></input>
    </form>
  </div>

  <div class="flex-container">
  <div className="Users"><button className={searchUsers ? "selected": "notSelected"} onClick={() => {
    setData([]);
    setSearchUsers(true);
  }}>Users</button></div>
  <div className="Tags"><button className={searchUsers ? "notSelected": "selected"} onClick={() => {
    setData([]);
    setSearchUsers(false);
  }}>Tags</button></div>


  </div>
 
 
  <div className="content"> 
      {data.map((jsonObj,i) => {

        if (data.length == 0) {
          return (<h2>No Results</h2>)
        }
      
        if (searchUsers) {
          return <UserSearchTile key={i.toString()} jsonObj={jsonObj} passUser={(userID) => props.passUser(userID)}/>
        }
        else {
          return <TagSearchTile key={i.toString()} jsonObj={jsonObj} onSelect={(tag) => selectTag(tag)}/>
        }
      })}
  </div>

  <div className="nav_bar"> 
    <div class="flex-container">
      <nav>
        <ul class ="nav_link"> 
          <li><a href="/Home">Home</a></li>
          <li><a href="#">Search</a></li>
          <li><a href="/Make_Post">New Post</a></li>
          <li><a href="#">Notifications</a></li>
        </ul>
      </nav>
    </div>
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

export default Search;