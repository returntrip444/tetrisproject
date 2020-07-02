import React, { useState, useEffect } from "react";
import "./LandingPage.css";


const LandingPage = () => {
    const [username, setUsername] = useState("");

    const handleInputChange = event => {
        const { value } = event.target
        setUsername(value)
    };

    const handleClick = event => {
        console.log(username)
    };

    return(
        <div className="container">
            <h1>Welcome to Tetris</h1>
            <h5>Please input your name here</h5>
            <input name="username" onChange={handleInputChange}/>
            <button type="button" onClick={handleClick}>Submit</button>
        </div>
    );
};

export default LandingPage;