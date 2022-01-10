import { configureStore, createStore } from "@reduxjs/toolkit";
import scoreBoardSlice from '../ScoreBoard/scoreBoardSlice';
import { loadState, saveState } from './localStorage';
import { debounce } from './index';
const persistedState = loadState();

const store = configureStore({
  reducer: scoreBoardSlice.reducer,
  preloadedState: persistedState,
});


store.subscribe(debounce(() => {
  saveState({
    scoreBoard: store.getState().scoreBoard,
  });
}, 1000));


export {
  store
};