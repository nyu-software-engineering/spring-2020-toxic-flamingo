import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './UserSearchTile.css';

const UserSearchTile = (props) => {

    const jsonObj = props.jsonObj;

    return (
        <div className ="post">
            <img src={"#"} alt="no img" ></img>
            <p>{jsonObj.Username}</p>
            <br/>
            <div className="line"></div>
        </div>
    )
}

export default UserSearchTile;