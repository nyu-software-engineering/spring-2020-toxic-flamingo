import React, {useState} from "react";
import "./ProfPicPopUp.css";
import axios from "axios";

const PopUp = (props) => {
    const [bio, setBio] = useState("");

    function handleClick() {
        console.log("test");
    props.toggle();
    };

    function changeBio(e) {
        setBio(e.target.value);
    }

    function submit() {
        console.log(bio);
        console.log("testing");
        axios.post("/changeBio/", {userBio: bio})
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
                <h3>Change Bio</h3>
                <label>
                Enter Bio Here:
                <input type="text" name="name" onChange={changeBio}/>
                </label>
                <br />
                <input type="submit" onClick={submit}/>
            </form>
        </div>
    </div>
    );
}

export default PopUp;