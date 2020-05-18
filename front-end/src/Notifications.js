import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import './Notifications.css';
import Notification from './Notification';


const Notifications = (props) => {

    const [data, setData] = useState([]);

    useEffect( () => {

        //fetch data

        axios.get('/Notifications')
        .then((response) => {
            setData(response.data);
        })
        .catch(err => {
            console.log("error");
            console.error(err);

            const backupData = [{
                id: 1,
                isFollower: true,
                userName: "myFriendDave",
                comment: ""
                }, {
                id: 2,
                isFollower: false,
                userName: "myOtherFriendJohn",
                comment: "great post dude!"
                }
            ];
            setData(backupData);
        })
    }, []);

    function goBack(){
        props.history.goBack();
    } 

    return(
        <div className="Notifications">
            <div class="flex-container-notifications">
            
            <div className="back_button">
                <img onClick={goBack} src="/back-button.jpg" alt="where my button at"></img>
            </div>
            <h1>Notifications</h1>
            </div>
            {data.map((jsonObj, i) => (
                <Notification key={jsonObj.id} data={jsonObj}/>
            ))}
        </div>
    );

}

export default withRouter(Notifications);
