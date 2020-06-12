import React, {useState} from "react";
import "./ProfPicPopUp.css";
import axios from "axios";

const PopUp = (props) => {
    const [imageLink, setImageLink] = useState("");

    function handleClick() {
        console.log("test");
    props.toggle();
    };

    function changeImageLink(e) {
        setImageLink(e.target.value);
    }

    function submit() {
        console.log(imageLink);
        console.log("testing");
        axios.post(process.env.REACT_APP_BACKEND + "/changeProfilePic/", {profPic: imageLink}, {withCredentials: true})
        .then ((res) => {
            console.log('request is ok');
        })
        .catch( err => {
            console.error(err);
        })
    }

    return (
    <div className="modal">
        <div className="modal_content">
        <span className="close" onClick={handleClick}>
            &times;   
        </span>
        <form>
                <h3>Change Profile Picture</h3>
                <label>
                Paste Image Link Here:
                <input type="text" name="name" onChange={changeImageLink}/>
                </label>
                <br />
                <input type="submit" onClick={submit}/>
            </form>
        </div>
    </div>
    );
}

export default PopUp;