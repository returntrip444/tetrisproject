import React from 'react';
import { BrowserRouter as Route, Router, Switch} from "react-router-dom"
import LandingPage from "./pages/LandingPage/LandingPage";
import Tetris from "./pages/Tetris/Tetris";
import logo from './logo.svg';
import { createBrowserHistory } from "history"
import './App.css';

function App() {
  const history = createBrowserHistory();

  return (
      <div className="App">
        {/* <LandingPage /> */}
        <Tetris />
      
    </div>
  );
}

export default App;
