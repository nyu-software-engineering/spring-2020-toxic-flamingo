import React from 'react';

const EditProfile = (props) => {
    return (
        <div>
         <form action="/upload/photo" enctype="multipart/form-data" method="POST"> 
            <input type="file" name="myImage" accept="image/*" />
            <input type="submit" value="Upload Photo"/>
        </form>

        <form action="/edit-profile" method="POST"/>
        <img alt='profile pic' action="/change-pic" method="POST"/>
        <p>Name: </p>
              <input type='text' name='name' />
        <p>Bio: </p>
              <textarea name='bio'></textarea>
        </div>
    );
}

export default EditProfile;

