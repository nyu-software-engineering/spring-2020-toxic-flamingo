import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './MainFeed.css';
import Post from './Post';

const MainFeed = (props) => {

    const [data, setData] = useState([]);

    // load in posts or whatever
    useEffect( () => {
        //fetch data

        axios.get("https://api.mockaroo.com/api/0abb6050?count=20&key=ffab93f0")
        .then ((response) => {
            setData(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);

            //fake backup data
            const backupData = [
                {
                    id: 1,
                    artist_name: "Mr Cardify",
                    song_title: "Rock my world",
                    username: "rGeogioo001",
                    post_title: "coolest post ever",
                    post_comment: "Wow, cool song!",
                    post_commenter: "my friend dave"
                }
            ];
            setData(backupData);
        })
        
    }, []);

    

    return(
        <div className="MainFeed">
            <h1>Appbar</h1>
            {data.map((jsonObj, i) => (
                <Post key={jsonObj.id} data={jsonObj}/>
            ))}
        </div>
    );

}

export default MainFeed;