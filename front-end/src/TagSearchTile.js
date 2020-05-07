import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './UserSearchTile.css';
import FeedWrapper from './FeedWrapper';

const TagSearchTile = (props) => {


    const jsonObj = props.jsonObj;

    

    return (
        <div className ="post" onClick={() => props.onSelect(jsonObj.tag)}>
            <p>#{jsonObj.tag}</p>
            <br/>
            <div className="line"></div>
        </div>
    )
}

export default TagSearchTile;