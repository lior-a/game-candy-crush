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

export default scoreBoardSlice;

export const { addNewScoreToBoad } = scoreBoardSlice.actions;