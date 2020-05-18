import React from 'react';
import { FormControl, FormControlLabel, FormGroup, Switch} from '@material-ui/core';
import "./NotificationSettings.css";
import BurgerMenu from './BurgerMenu';


const NotificationSettings = (props) => {
  return (
      <div>
<BurgerMenu right pageWrapID={"ProfileHeader"} outerContainerID={"outer-container"}/>
    
     
<div className="NotificationSettings">
    <h1>Notification Settings</h1>
    <section className="main-content">
        <FormGroup>
        <FormControlLabel
        control={<Switch />}
            label="Followers"
            labelPlacement="start"
        />
        <FormControlLabel
        control={<Switch />}
            label="Messages"
            labelPlacement="start"
        />
        <FormControlLabel
        control={<Switch />}
            label="New Posts"
            labelPlacement="start"  
        />
        <FormControlLabel
        control={<Switch />}
            label="Trophies"
            labelPlacement="start"
        />
        <FormControlLabel
        control={<Switch />}
            label="Harmonies"
            labelPlacement="start"
        />
        </FormGroup>
    </section>
</div> </div>
  );
}

export default NotificationSettings;