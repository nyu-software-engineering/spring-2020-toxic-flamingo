import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import './Make_Post.css';
import queryString from 'query-string';
import { withRouter} from 'react-router-dom';

// import logo from './logo.svg';
//import './About.css';

const Make_Post = (props) => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

  function submitSearch(e) {
    e.preventDefault();
    console.log("BUTTON?");
    
    axios.get(process.env.REACT_APP_BACKEND + "/Make_Post/" + search, {withCredentials: true})
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
<div className="MakePost">
  <div className="Header">
    <div class="flex-container">
      <div class="back_button">
        <img onClick={() => props.history.goBack()} src="/back-button.jpg" alt="where my button at"></img>
      </div>
      <div>
      </div>
    </div>

    <div className="SearchBar">
      <form onSubmit={submitSearch}>
        <input type="text" placeholder="Search (Artist, Title, Album):" onChange={handleSearch}></input>
        <button>Submit</button>
      </form>
    </div>



    <div class="flex-container">
    </div>
  
  
    <div className="content"> 
      {data.map((jsonObj,i) => (
            <div class ="post" key={i.toString()} onClick={() => choose(data[i])}>  
            <img src={jsonObj.album.images[0].url} width='40' height='40' alt="temp"></img>
            <p>{jsonObj.name}: {jsonObj.artists.map(
              (artist, i) => {
                if (i < jsonObj.artists.length - 1) {
                  return artist.name + ", "
                }
                else {
                  return artist.name
                }
              }
            )}</p>
            <br/>
            <div class="line"></div>
            </div>
            
          ))}
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

export default withRouter(Make_Post);