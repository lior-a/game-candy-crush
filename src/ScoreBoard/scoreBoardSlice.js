import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    scoreBoard: [],
}

/**
 * Reducers and actions
 */
const scoreBoardSlice = createSlice({
  name: "scoreBoard",
  initialState: initialState,
  reducers: {
      addNewScoreToBoad(state, action) {
        // console.log('SBslice.js: , ' , state)
        let newScore = {
            score: action.payload.score,
            date: action.payload.date,
            moves: action.payload.moves
        };
        let newScoreBoard = [...state.scoreBoard, newScore];

        return {
            scoreBoard: newScoreBoard
        };
      },
  }
});

/**
 * Selectors
 */
 export const getScoreBoardList = (state) => state.scoreBoard;

 export const getScoreBoardSortByHighScoreList = (state) => {
    const newState = Object.assign({}, state);
    return newState.scoreBoard.slice().sort((a,b) => b.score - a.score)
 };

export default scoreBoardSlice;

export const { addNewScoreToBoad } = scoreBoardSlice.actions;