import React, {useState, useEffect, Component} from 'react';

import Make_Post from './Make_Post';
import Make_Post2 from './Make_Post2';


const MakePostWrapper = (props) => {

    const [showScreenOne, setScreenOne] = useState(props.showScreenOne);
    const [songJSON, setSong] = useState({});


    function handleSongSelect(songInfo) {

        console.log("got data " + songInfo);
        
        if (songInfo != null) {
            setSong(songInfo);
            setScreenOne(false);
        }
    }

    if (showScreenOne) {
        return (
            <Make_Post passSongData={(songInfo) => handleSongSelect(songInfo)}/>
        );
    }
    else {
        return (
            <Make_Post2 songData={songJSON}/>
        )
    }
}


export default MakePostWrapper;