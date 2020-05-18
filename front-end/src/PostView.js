import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './PostView.css';
import { Redirect } from 'react-router-dom';

const PostView = (props) => {

    const data = props.data;
    const userID = data.userID;

    const [audioPlayer] = useState(new Audio());
    let val = "Play";
    const [username, setUsername] = useState("");
    const [playPause, setData] = useState(val);

    const [shouldRedirect, setRedirect] = useState(false);

    useEffect(() => {
        async function fetchUsername() {
            await axios.get("/getUsername/" + userID)
            .then ((response) => {
                setUsername(response.data);
                console.log(username);
                console.log(response.data);
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
        }
        else {val = 'Pause';
        setData(val);
        
        audioPlayer.src=spotifyLink
        audioPlayer.play();
        }
    }

    if (shouldRedirect) {
        return (
            <Redirect push to={"/UserProfile/"+username}/>
        );
    }

    return (
        <div className="FeedPost">
            <div className='postHeader'>

                <h4 onClick={() => setRedirect(true)}>{username}</h4>
            </div>
            <div className='postContent'>
                <div className='songInfo'>
                    <p>{data.artistName} -- {data.songName}</p>
                </div>
            </div>
            <div className='posterInfo'>
                    <div className='musicPlayer'><button onClick={musicPlayer}>{playPause}</button></div>
                    <img className='albumImage' alt='avatar' src={data.picture} />
                </div>
            <div className='description'>
                <p>{data.description}</p>
            </div>
        </div>
    );
}

export default PostView;