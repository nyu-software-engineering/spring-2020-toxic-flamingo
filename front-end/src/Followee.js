import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './followee.css';


const Followee = (props) => {

    const [data, setData] = useState([]);

    useEffect( () => {
      axios.get("https://api.mockaroo.com/api/87521f10?count=10&key=5296eab0")
      .then ((response) => {
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
                <h3>Followee</h3>
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
                    <li><a href="/Home">Home</a></li>
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