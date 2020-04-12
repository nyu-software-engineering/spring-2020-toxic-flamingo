import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './HashtagFeed.css';
import Post from './Post';

const HashtagFeed = (props) => {

    const [data, setData] = useState([]);
    const [noPosts, setPosts] = useState(false);

    // this will be passed in from hashtag search page, for now it is hardcoded as Computers based on mockaroo data
    const hashtag = "nyc"; //props.hashtag; 

    // load in posts or whatever
    useEffect( () => {
        //fetch data
        axios.get("/hashtagFeed/" + hashtag)
        .then ((response) => {

            // //filter data for hashtags
            // const filteredResponse = [];

            // for (let i=0; i < response.data.length; i++) {
            //     let jsonObj = response.data[i];
            //     if (jsonObj.hashtag == hashtag) filteredResponse.push(jsonObj);
            // }
            // if (filteredResponse.length == 0) setPosts(true);
            // setData(filteredResponse);

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
                    post_commenter: "my friend dave",
                    hashtag: hashtag
                }
            ];
            setData(backupData);
        })
        
    }, []);

    if (noPosts) return (
        <div className="HashtagFeed">
            <h1>Appbar</h1>
            <h3>No posts with #{hashtag}</h3>
        </div>
    );

    return(
        <div className="HashtagFeed">
            <h1>Appbar</h1>
            <h3>#{hashtag}</h3>
            {data.map((jsonObj, i) => (
                <Post key={jsonObj.id} data={jsonObj}/>
            ))}
        </div>
    );

}

export default HashtagFeed;