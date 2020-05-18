import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import "./PostPreview.css";
import { Redirect } from 'react-router-dom';

const PostPreview = (props) => {

    const [shouldRedirect, setRedirect] = useState(false);
    const [postID, setPostID] = useState("");

    const [data, setData] = useState([]);
    const userID = props.userID;
    console.log(userID);
    
    // load in posts or whatever
    useEffect( () => {
        //fetch data


        axios.get("/profileposts/" + userID)
        .then ((response) => {
            setData(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);

            //fake backup data
            const backupData = [
                {
                    coverart: "https://www.udiscovermusic.com/wp-content/uploads/2018/08/Kanye-West-Graduation-album-cover-web-optimised-820.jpg"
                }
            ];
            setData(backupData);
        })
        
    }, []);

    function handlePostClick(id) {

        setPostID(id);
        setRedirect(true);
    }

    if (shouldRedirect) {
        return <Redirect push to={"PostComments/"+postID}/>
    }

    return(
        <div className="PreviewPost">
            <div className="flex-container-post">
                {data.map((jsonObj, i) => (
                    <div className="coverArt" key={i} onClick={() => handlePostClick(jsonObj._id)}>
                        <img src={jsonObj.picture} height="300" width="300" />
                    </div>
                ))}
            </div>

        </div>
    );

}

export default PostPreview;