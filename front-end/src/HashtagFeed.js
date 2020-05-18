import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import './HashtagFeed.css';
import Post from './Post';
import { Redirect } from 'react-router-dom';

const HashtagFeed = (props) => {

    const [data, setData] = useState([]);
    const [noPosts, setPosts] = useState(false);
    const [postID, setPostID] = useState("");
    const [shouldRedirect, setRedirect] = useState(false);

    // this will be passed in from hashtag search page, for now it is hardcoded
    const hashtag = props.match.params.hashtag;

    // load in posts
    useEffect( () => {
        //fetch data
        axios.get("/hashtagFeed/" + hashtag)
        .then ((response) => {
            console.log("testing")
            //filtering now takes place on the backend

            setData(response.data);
            if (response.data.length == 0) setPosts(true);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);
        })
        
    }, []);

    if (noPosts) return (
        <div className="HashtagFeed">
            <h3>No posts with #{hashtag}</h3>
        </div>
    );

    function handleCommentClick(postID) {
        setPostID(postID);
        setRedirect(true);
    }

    if (shouldRedirect) {
        return (
            <Redirect push to={'/PostComments/' + postID}/>
        );
    }

    return(
        <div className="HashtagFeed">
            <h3>#{hashtag}</h3>
            {data.map((jsonObj, i) => (
                <Post key={jsonObj._id} data={jsonObj} loadComments={((postID) => handleCommentClick(postID))} passUser={(userID) => props.passUser(userID)}/>
            ))}
        </div>
    );

}

export default withRouter(HashtagFeed);