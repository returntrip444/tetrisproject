import React, { useState, useEffect } from "react";
import { getUser, saveUser } from "../../utils/API";
import "./Tetris.css";

const style = {
  height: "90vh",
  width: "auto",
};
const Tetris = (props) => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    getUser()
    .then(user => {
      setIsLoaded(true);
      setUserData(user);
    })
    .catch(err => {
      setIsLoaded(true);
      setError(err);
    })
  }, []);

  if(error) return <div>Error: {error.message}</div>
  if(!isLoaded) return <h1>Loading...</h1>
  if(!userData) return <h1>Loading the user data...</h1>
  
// console.log(userData);

const highScoreEl = () => userData.data.sort((a, b ) => b.score - a.score).slice(0, 5).map(users => (<li>{`${users.username} : ${users.score}`}</li>))

const handleClick = event => {
  event.preventDefault();
  console.log("hello world")

    let score = document.getElementById("score").innerText;
    score = "3000"
    const name = props.username

    const data = {
      username: name,
      score: score,
    }

    saveUser(data)
    .then(() => alert("User is saved!"))
    .catch(err => console.log(err));
    


};  

  return (<div style={{backgroundColor: "violet", fontFamily: "'Press Start 2P', cursive"}}>
    <h1>TETRIS</h1>
    <p>{props.username}</p>
    <div id="score"></div>
<div id="high-scores"><ul>{highScoreEl()}</ul></div>
    <canvas
      id="tetris"
      width="240"
      height="400"
      style={style}
    ></canvas>
    <button onClick={handleClick}>Save Score</button>
  </div>
  );
};
export default Tetris;