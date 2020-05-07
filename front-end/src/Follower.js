import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './follower.css';


const Follower = (props) => {

    const [data, setData] = useState([]);

    useEffect( () => {
      axios.get("/Follower")
      .then ((response) => {
        console.log('where is it');
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
                <h3>Followers</h3>
            </div>
            </div>

            <div className="content"> 
                {data.map((jsonObj,i) => (
                <div class ="post">
                <img src={jsonObj.icon} ></img>
                <p>{jsonObj.user}</p>
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
    );
}

export default Follower;