import React, { useState } from 'react';

import './MusicPlayer.css';

const MusicPlayer = (props) => {

    let val = "Play"

    const [playPause, setData] = useState(val);

    return (
        <div className="player">
            <button className="playButton" onClick={onPlayPause}>{playPause}</button>
        </div>
    );

    function onPlayPause() {
        
        if (playPause == 'Play') {
            val = 'Pause';
        }
        else val = 'Play';
        setData(val);
    }
}




export default MusicPlayer;