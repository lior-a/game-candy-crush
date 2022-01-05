import { configureStore, createStore } from "@reduxjs/toolkit";
// import gameReducer from "../GameSlice";
import scoreBoardSlice from '../ScoreBoard/scoreBoardSlice';

export const store = configureStore({
  // reducer: gameReducer.reducer,
  reducer: scoreBoardSlice.reducer
});