import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './MainFeed.css';
import Post from './Post';

const PostPreview = (props) => {

    const [data, setData] = useState([]);

    // load in posts or whatever
    useEffect( () => {
        //fetch data

        axios.get("https://api.mockaroo.com/api/f9224880?count=10&key=83e46730")
        .then ((response) => {
            setData(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);

            //fake backup data
            const backupData = [
                {
                    cover_art:"/components/SharmonyLogo.PNG"
                }
            ];
            setData(backupData);
        })
        
    }, []);

    

    return(
        <div class="PreviewPost">
            {data.map((jsonObj, i) => (
                <div class='picture'>
                <img src={jsonObj.cover_art}/>
                </div>
            ))}
        </div>
    );

}

export default PostPreview;