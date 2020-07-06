import React from "react";
import "./Tetris.css";

const style = {
  height: "90vh",
  width: "auto",
};
const Tetris = (props) => {
  return (<div style={{backgroundColor: "violet", fontFamily: "'Press Start 2P', cursive"}}>
    <h1>TETRIS</h1>
    <p>{props.username}</p>
    <div id="score"></div>
    <canvas
      id="tetris"
      width="240"
      height="400"
      style={style}
    ></canvas>
  </div>
  );
};
export default Tetris;