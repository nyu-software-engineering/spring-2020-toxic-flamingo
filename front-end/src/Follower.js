import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import FollowerTile from './FollowerTile';
import {withRouter} from 'react-router-dom';
import './follower.css';


const Follower = (props) => {

    const [data, setData] = useState([]);
    let userID = props.userID;

    useEffect( () => {
      axios.get(process.env.REACT_APP_BACKEND + "/Follower/" + userID, {withCredentials: true})
      .then ((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(err => {
        console.log("error");
        console.log(err);
      })
      
    }, []);

    function goBack(){
        props.history.goBack();
    }

    return (
        <div class = "Header">
            <div class="flex-container">
            <div class="back_button">
            <img onClick={goBack} src="/back-button.jpg" alt="where my button at"></img>
            </div>
            <div>
                <h3>Followers</h3>
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
        </div>
    );
}

export default withRouter(Follower);