import React, {useState, useEffect, Component} from 'react';
import './Trophy.css';



const Trophy = (props) => {
    const data = props.data;
    
    return (
        
        <div class="flex-container">
            <div className="trophyBox">
            <div className='postHeader'>
                <img className='trophyIcon' alt='icon' src={data.trophy_icon} />
                <h3>{data.trophy}</h3>
            </div>
            <div className='trophyContent'>
                <p>{data.trophy_description}</p>
            </div>
            </div>
        </div>
    );
    
}

export default Trophy;