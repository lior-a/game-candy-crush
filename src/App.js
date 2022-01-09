import { useState, useEffect } from 'react';
import { useSelector, useDispatch, Provider } from "react-redux";
import { store } from "./utils/store";
import Gamescreen from './Gamescreen';
import ScoreBoard from './ScoreBoard';
import About from './About';
import HowToPlay from './HowToPlay';
import Homepage from './Homepage';
import NoMatch from './Layout/NoMatch';
import Layout from './Layout';
import { getDateString } from './utils';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { getScoreBoardList, getScoreBoardSortByHighScoreList } from './ScoreBoard/scoreBoardSlice';

const App = () => {

  // const scoreBoardList = useSelector(getScoreBoardSortByHighScoreList);

  const [score, setScore] = useState({
    score: 0,
    date: getDateString(),
    moves: 0
  })

  const startGame = () => {
    setScore((prevScore) => ({...prevScore, score: 0}));
  }

  return (
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />}/>
            <Route path="/game-play" element={<Gamescreen />}/>
            <Route path="/score-board" element={<ScoreBoard  />}/>
            <Route path="/how-to-play" element={<HowToPlay />}/>
            <Route path="/about" element={<About />}/>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
  )
}

const appWithProvider = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  )
}

export default appWithProvider;
