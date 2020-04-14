import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

const Harmonies = (props) => {

        const [data, setData] = useState([]);
    
        // load in posts or whatever
        useEffect( () => {
            //fetch data
            axios.get("https://api.mockaroo.com/api/11bdcb60?count=10&key=06908ea0")
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
                        song_title: "Let It Be",
                        artist: "The Beatles"
                      }
                ];
                setData(backupData);
            })
            
        }, []);
    
  return (
<div className="Harmonies">
    <h1>Harmonies</h1>
            {data.map((jsonObj, i) => (
                <Harmonies key={jsonObj.id} data={jsonObj}/>
            ))}
</div>
  );
}

export default Harmonies;