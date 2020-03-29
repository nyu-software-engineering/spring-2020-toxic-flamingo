import React from 'react';
import './Make_Post2.css';

const Make_Post2 = (props) => {



    return(
        <div className="Header">
            <div class="flex-container">
                <div class="back_button">
                <img src="/back-button.jpg" alt="where my button at"></img>
                <button class="btn">a</button>
                </div>
                <div>
                <img src="/temp-logo.jpg" alt="logo plz" width="200" height="50"></img>
                </div>

            </div>

            <div class="picture"> <img src="/post2.jpg"></img> </div>

            <div class="text"> 
            <input type="text" placeholder="Write your music!"></input>
            </div>

            <div class="post">
                <form action="/Make_Post">
                    <input type="submit" value="Create Post"/>
                 </form>
            </div>


            <div className="nav_bar"> 
                <div class="flex-container">
                <nav>
                    <ul class ="nav_link"> 
                    <li><a href="/MainFeed">Home</a></li>
                    <li><a href="#">Search</a></li>
                    <li><a href="/Make_Post">New Post</a></li>
                    <li><a href="#">Notifications</a></li>
                    </ul>
                </nav>
                </div>
                </div>
        </div>
        
    );
}

export default Make_Post2;