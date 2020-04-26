import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './MainFeed.css';
import Post from './Post';

const MainFeed = (props) => {

    const [data, setData] = useState([]);

    const userId = "5ea5f57f46ba2e699831ae3f";

    // load in posts
    useEffect( () => {
        //fetch data

        axios.get("/mainFeed/" + userId)
        .then ((response) => {
            
            setData(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
        
    }, []);

    

    return(
        <div className="MainFeed">
            <h1>Appbar</h1>
            {data.map((jsonObj, i) => (
                <Post key={jsonObj._id} data={jsonObj}/>
            ))}
        </div>
    );

}

export default MainFeed;