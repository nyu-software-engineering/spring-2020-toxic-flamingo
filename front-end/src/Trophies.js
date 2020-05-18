import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import Trophy from './Trophy';
import './Trophies.css';
import BurgerMenu from './BurgerMenu';

const Trophies = (props) => {

        const [data, setData] = useState([]);
    
        const userID = "12345" //hardcoded for now

        // load in posts or whatever
        useEffect( () => {
            //fetch data
            axios.get("/trophies")
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
                        trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg",
                        hidden: false
                    }
                ];
                setData(backupData);
            })
            
        }, []);
    
  return (
      <div>
          <BurgerMenu right pageWrapID={"ProfileHeader"} outerContainerID={"outer-container"}/>
      
<div className="Trophies">
    <h1><u>Trophies</u></h1>
        <div class="flex-container">
            <div class="flex-container > div">
                {data.map((jsonObj, i) => (
                    <Trophy key={jsonObj.id} data={jsonObj}/>
                ))}
            </div>
        </div>
</div></div>
  );
}

export default Trophies;