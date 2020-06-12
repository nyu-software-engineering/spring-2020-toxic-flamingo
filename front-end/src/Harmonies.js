import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import Post from './Post';
import {withRouter} from 'react-router-dom';
import './Harmonies.css';

const Harmonies = (props) => {
    const userID = props.userID;

        const [data, setData] = useState([]);
    
        // load in posts or whatever
        useEffect( () => {
            //fetch data
            axios.get(process.env.REACT_APP_BACKEND + "/Harmonies/" + userID, {withCredentials: true})
            .then ((response) => {
                setData(response.data);
            })
            .catch( err => {
                console.log("ERROR!");
                console.error(err);
    
                //fake backup data
                const backupData = [
                    {
                        id: 1,
                        song_title: "Let It Be",
                        artist: "The Beatles"
                      }
                ];
                setData(backupData);
            })
            
        }, []);
    
        function goBack(){
            props.history.goBack();
        }
if(!data){
    return(
        <h1>Loading...</h1>
    ) 
} else {
  return (  
    <div className="Harmonies">
        <div className="flex-container">
            <div className="back_button">
                <img onClick={goBack} src="/back-button.jpg" alt="where my button at"></img>
            </div>
            <h1>Harmonies</h1>
        </div>
        {data.map((jsonObj, i) => (
            <Post key={jsonObj.id} data={jsonObj}/>
        ))}
    </div>
    );
    }
}

export default withRouter(Harmonies);