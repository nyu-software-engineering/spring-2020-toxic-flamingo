import React, { useState } from 'react';
import { bubble as Menu } from 'react-burger-menu';
import './BurgerMenu.css';
import axios from 'axios';
import {Redirect} from 'react-router';

const BurgerMenu = () => {
  const [isRedirect, setIsRedirect] = useState(false);


  function LogOut() {
      axios.get(process.env.REACT_APP_BACKEND + "/signOut/", {withCredentials: true}) 
      .then((response) => {
          if (response.status === 200) {
              setIsRedirect(true);
          }
      })
  }

  if(isRedirect) {
      return <Redirect push to='/'/> 
  }

   //NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu >
        <a id="ChangeEmail" className="menu-item" href="/ChangeEmail">Change Email</a>
        <a id="ChangePassword" className="menu-item" href="/ChangePassword">Change Password</a>
        <a id="Trophies" className="menu-item" href="/Trophies">Trophies</a>
        <a id="Log Out" className="menu-item" onClick={LogOut}>Log Out</a>
        
      </Menu>
    );
  
}

export default BurgerMenu;