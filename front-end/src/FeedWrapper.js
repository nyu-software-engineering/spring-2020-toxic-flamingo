import React, {useState, useEffect, Component} from 'react';

import MainFeed from './MainFeed';
import HashtagFeed from './HashtagFeed';
import PostComments from './PostComments';

const FeedWrapper = (props) => {

    const [isMainFeed, setFeed] = useState(props.isMainFeed);
    const [shouldLoadComments, setLoadComments] = useState(false);
    const [postID, setPostID] = useState("");

    const hashtag = props.hashtag;


    function handleComments(postID) {
        
        setPostID(postID);

        setLoadComments(true);
    }

    if (shouldLoadComments) {
        return(
            <PostComments postID={postID} passUser={(userID) => props.passUser(userID)} isMainFeed={isMainFeed} hashtag={hashtag}/>
        );
    }
    else if (isMainFeed) {
        return(
            <MainFeed loadComments={(postID) => handleComments(postID)} passUser={(userID) => props.passUser(userID)}/>
        );
    }
    else {
        return(
            <HashtagFeed loadComments={(postID) => handleComments(postID)} hashtag={hashtag} passUser={(userID) => props.passUser(userID)}/>
        );
    }
}


export default FeedWrapper;