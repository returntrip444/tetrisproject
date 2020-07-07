import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, 
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Tetris from "./pages/Tetris/Tetris";
import logo from './logo.svg';
// import { createBrowserHistory } from "history"
import './App.css';

function App() {
  // const history = createBrowserHistory();
  const [username, setUsername] = useState("");

  const handleInputChange = userinput => {
    // console.log(event)
    console.log(userinput);
      // const { value } = event.target
      setUsername(userinput);
  };




  return (
      <div className="App">
       <Router>
         <Route exact path="/">
           <LandingPage inputChange={handleInputChange}/>
         </Route>
         <Route exact path="/tetris">
           <Tetris username={username}/>
         </Route>
       </Router>
       
      
    </div>
  );
}

export default App;
