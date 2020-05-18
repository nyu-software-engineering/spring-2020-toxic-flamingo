import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import './BurgerMenu.css';

const BurgerMenu = () => {
 

   //NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu >
        <a id="ChangeEmail" className="menu-item" href="/ChangeEmail">Change Email</a>
        <a id="ChangePassword" className="menu-item" href="/ChangePassword">Change Password</a>
        
        <a id="Trophies" className="menu-item" href="/Trophies">Trophies</a>
        <a id="Log Out" className="menu-item" href="/LogIn">Log Out</a>
        
      </Menu>
    );
  
}

export default BurgerMenu;