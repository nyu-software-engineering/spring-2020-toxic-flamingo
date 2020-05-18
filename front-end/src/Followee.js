import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import FollowerTile from './FollowerTile';

import './followee.css';


const Followee = (props) => {

    const [data, setData] = useState([]);
    let userID = props.userID;

    useEffect( () => {
      axios.get("/Followee/" + userID)
      .then ((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(err => {
        console.log("error");
        console.log(err);
      })
      
    }, []);

    return (
        <div class = "Header">
            <div class="flex-container">
            <div class="back_button">
            <img src="/back-button.jpg" alt="where my button at"></img>
            <button class="btn"></button>
            </div>
            <div>
                <h3>Following</h3>
            </div>
            </div>

            <div className="content"> 
                {data.map((jsonObj,i) => {
                    console.log(jsonObj);
                    if (data.length == 0) {
                    return (<h2>No Followers</h2>)
                    } else {
                    return <FollowerTile key={i.toString()} userID={jsonObj}/>
                    }
                })}
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
    );
}

export default Followee;