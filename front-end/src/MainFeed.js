import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './MainFeed.css';
import Post from './Post';
import { Redirect } from 'react-router-dom';

//const BACKEND_IP = process.env.NODE_ENV === "production"? "http://64.225.7.121:7000" :"http://localhost:7000";

const MainFeed = (props) => {

    const [data, setData] = useState([]);

    const [shouldRedirect, setRedirect] = useState(false);
    const [postID, setPostID] = useState("");
    const [noFollowingText, setNoFollowingText] = useState("");

    //const userId = "5eab5536cfcc1f47a02d55cf";

    // load in posts
    useEffect( () => {
        //fetch data
        //let mainFeedRoute = `${BACKEND_IP}/mainFeed/`
        axios.get(process.env.REACT_APP_BACKEND + "/mainFeed/", {withCredentials: true})
        .then ((response) => {
            console.log(response);
            setData(response.data.postIDList);
            if (!response.data.hasFollowers) {
                setNoFollowingText("Looks like you're not following anyone yet. Go search for some cool pages or friends. Here's some Michael Jackson in the meantime.");
            }
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
        <div className="NoFollowing">
            <h3>{noFollowingText}</h3>
        </div>
            {data.map((jsonObj, i) => (
                <Post key={jsonObj._id} data={jsonObj} loadComments={((postID) => handleCommentClick(postID))}/>
            ))}
        </div>
    );
}


export default MainFeed;