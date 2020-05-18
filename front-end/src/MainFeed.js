import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './MainFeed.css';
import Post from './Post';
import { Redirect } from 'react-router-dom';

const MainFeed = (props) => {

    const [data, setData] = useState([]);

    const [shouldRedirect, setRedirect] = useState(false);
    const [postID, setPostID] = useState("");

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

        setPostID(postID);
        setRedirect(true);
    }

    if (shouldRedirect) {
        return (
            <Redirect push to={"/PostComments/"+postID}/>
        );
    }

    return(
        <div className="MainFeed">
            {data.map((jsonObj, i) => (
                <Post key={jsonObj._id} data={jsonObj} loadComments={((postID) => handleCommentClick(postID))}/>
            ))}
        </div>
    );

}

export default MainFeed;