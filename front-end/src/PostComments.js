import React, {useState, useEffect, Component} from 'react';
import {withRouter} from 'react-router-dom';
import './PostComments.css';
import CommentView from './CommentView';
import axios from 'axios';
import CommentBuilder from './CommentBuilder';
import PostView from './PostView';

const PostComments = (props) => {
    
    let postID = props.match.params.postID;
    
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadCount, setReload] = useState(0);

    const [postData, setPostData] = useState({});

    const [shouldRedirect, setRedirect] = useState(false);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND + '/loadComments/' + postID, {withCredentials: true})
        .then((response) => {
            setComments(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log("ERRor in postComments.js");
            console.log(err);
        });

        axios.get(process.env.REACT_APP_BACKEND + '/loadPost/' + postID, {withCredentials: true})
        .then((response) => {
            setPostData(response.data);
        })
        .catch(err => {
            console.log("ERRor in postComments.js");
            console.log(err);
        });
    }, [reloadCount]);


    if (loading == true) {
        return (
            <div>
                <h2>Loading</h2>
            </div>
        )
    }

    return (

        <div className="PostComments">
            <PostView data={postData} />
            <h5>Comments</h5>
            {comments.map((commentJson, i) => (
                <CommentView key={i} data={commentJson}/>
            ))}
            <CommentBuilder postID={postID} updateComments={() => {
                setReload(reloadCount + 1);
            }}/>
            <div className="buffer"></div>
        </div>
    );

}

export default withRouter(PostComments);