import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import Trophy from './Trophy';

const Trophies = (props) => {

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
                        trophy: "Harmonize",
                        trophy_description: "Get your first Harmony!",
                        trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg"
                    }
                ];
                setData(backupData);
            })
            
        }, []);
    
  return (
<div className="Trophies">
    <h1>Trophies</h1>
            {data.map((jsonObj, i) => (
                <Trophy key={jsonObj.id} data={jsonObj}/>
            ))}
</div>
  );
}

export default Trophies;