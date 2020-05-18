import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './PostView.css';
//import { Redirect } from 'react-router-dom';

const PostView = (props) => {

    const data = props.data;
    const userID = data.userID;
    const [profilePic, setProfilePic] = useState("");
    const [audioPlayer] = useState(new Audio());
    let val = "Play";
    const [username, setUsername] = useState("");
    const [playPause, setData] = useState(val);
    const [img, setImg] = useState("https://cdn4.iconfinder.com/data/icons/game-interface-outline/100/objects-17-512.png");

    useEffect(() => {
        async function fetchUsername() {
            await axios.get("/getUsername/" + userID)
            .then ((response) => {
                setUsername(response.data.username);
                console.log(username);
                setProfilePic(response.data.profilepic);
            console.log(profilePic);
            })
            .catch( err => {
                console.log("ERROR!");
                console.error(err);
            })
        }
        fetchUsername();
    });

    function musicPlayer() {
        let spotifyLink = data.spotify
        console.log(spotifyLink)
        if (playPause == 'Pause') {
            audioPlayer.pause();
            setData('Play');
            setImg("https://cdn4.iconfinder.com/data/icons/game-interface-outline/100/objects-17-512.png");
        }
        else {
            val = 'Pause';
        setData(val);
        setImg("https://cdn1.iconfinder.com/data/icons/media-volume-1/48/017-512.png");
        audioPlayer.src=spotifyLink
        audioPlayer.play();
        }
    }

    return (
        <div className="FeedPost">
            <div className='postHeader'>
            
                <div className='username'>
                    <img className='profilepic' src={profilePic} />  
                <h4>{username}</h4></div>
            </div>
            <div className='postContent'>
                
            </div>
            <div className='posterInfo'>
                    <div className='musicPlayer'>
                        <img className='playButton' src={img} onClick={musicPlayer} height="400" width="300"/>
                    </div>
                    <img className='albumImage' alt='avatar' src={data.picture} />
                </div>
            <div className='songInfo'>
                <p>{data.artistName} -- {data.songName}</p>
            </div>
            <div className='description'>
                <p>{data.description}</p>
            </div>
        </div>
    );
}

export default PostView;