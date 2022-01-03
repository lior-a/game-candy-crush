import { useState, useEffect } from 'react';
// import Gameboard from './components/Gameboard';
import Game from './components/Game';
import ScoreBoard from './components/ScoreBoard';
import About from './components/About';
import HowToPlay from './components/HowToPlay';
import Homepage from './components/Homepage';
import Layout from './components/Layout';
import { getDateString } from './utils';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = () => {

  const [visibleScreen, setVisibleScreen] = useState('menu'); //default to menu
  const [scoreBoard, setScoreBoard] = useState([]);

  const [score, setScore] = useState({
    score: 0,
    date: getDateString(),
    moves: 0
  })

  const startGame = () => {
    setVisibleScreen('game-board');
    setScore((prevScore) => ({...prevScore, score: 0}));
  }


  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />}/>
            <Route path="/game" element={<Game />}/>
            <Route path="/score-board" element={<ScoreBoard />}/>
            <Route path="/how-to-play" element={<HowToPlay />}/>
            <Route path="/about" element={<About />}/>
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
