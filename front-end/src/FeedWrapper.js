import React, {useState, useEffect, Component} from 'react';

import MainFeed from './MainFeed';
import HashtagFeed from './HashtagFeed';
import PostComments from './PostComments';

const FeedWrapper = (props) => {

    const [isMainFeed, setFeed] = useState(props.isMainFeed);
    const [shouldLoadComments, setLoadComments] = useState(false);
    const [postID, setPostID] = useState("");


    function handleComments(postID) {
        
        setPostID(postID);

        setLoadComments(true);
    }

    if (shouldLoadComments) {
        return(
            <PostComments postID={postID}/>
        );
    }
    else if (isMainFeed) {
        return(
            <MainFeed loadComments={(postID) => handleComments(postID)}/>
        );
    }
    else {
        return(
            <HashtagFeed loadComments={(postID) => handleComments(postID)}/>
        );
    }
}


export default FeedWrapper;