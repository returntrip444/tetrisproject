import React from "react";
import { useHistory, Link } from "react-router-dom"
import "./LandingPage.css";


const LandingPage = ({ inputChange }) => {
    const history = useHistory();
    // const handleClick = () => {
    //     history.push("/tetris");
    // }

    const handleInputChange = event => {
        const { value } = event.target
        inputChange(value);
    }

    return(
        <div className="container">
            <h1>Welcome to Tetris</h1>
            <h5>Please input your name here</h5>
            <input name="username" onChange={handleInputChange}/>
            <Link to="/tetris"><button type="button">Submit</button></Link>
        </div>
    );
};

export default LandingPage;