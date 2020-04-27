import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import Make_Post from './Make_Post'
import Make_Post2 from './Make_Post2'
import queryString from 'query-string';

// import logo from './logo.svg';
//import './About.css';

const MainFeed = (props) => {

    const [data, setData] = useState(true);

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

    function handle(postID) {
        console.log("woah! " + postID);
    }

    return(
        
    );

}

export default MainFeed;