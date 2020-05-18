import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import Trophy from './Trophy';
import './Trophies.css';
import BurgerMenu from './BurgerMenu';

const Trophies = (props) => {
        const trophyData = [
            {
                id: 1,
                trophy: "Harmonize",
                trophy_description: "Get your first Harmony!",
                trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg",
                hidden: true
            },
            
        ];
        const [data, setData] = useState([]);
        let list;
        // load in posts or whatever
        useEffect( () => {
            
            axios.get('/trophies/')
            .then(doc => {
                console.log(doc.data);
                list = doc.data;
                if(list[0] === true){
                    console.log('hereherer');
                    trophyData[0].hidden = false;
                }
                setData(trophyData);
            })
            .catch(err=>{console.log(err)});
            
        
            
        }, []);

        if(!data){
            
            return (<h1>Loading...</h1>)
        }
        else{
        

  return (
      <div>
          <BurgerMenu right pageWrapID={"ProfileHeader"} outerContainerID={"outer-container"}/>
      
<div className="Trophies">
    <h1><u>Trophies</u></h1>
        <div class="flex-container">
            <div class="flex-container > div">

               

                {data.map((jsonObj, i) => (
                    <Trophy key={jsonObj.id} data={jsonObj} hidden={jsonObj.hidden}/>
                ))}
            </div>
        </div>
</div></div>
  );
}
}

export default Trophies;