import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './MainFeed.css';
import Post from './Post';

const MainFeed = (props) => {

    const [data, setData] = useState([]);

    //const userId = "5eab5536cfcc1f47a02d55cf";

    // load in posts
    useEffect( () => {
        //fetch data

        axios.get("/mainFeed/")
        .then ((response) => {
            
            setData(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
        
    }, []);

    function handleCommentClick(postID) {
        console.log("woah! " + postID);

        props.loadComments(postID);
    }

    return(
        <div className="MainFeed">
            {data.map((jsonObj, i) => (
                <Post key={jsonObj._id} data={jsonObj} loadComments={((postID) => handleCommentClick(postID))} passUser={(userID) => props.passUser(userID)}/>
            ))}
        </div>
    );

}

export default MainFeed;