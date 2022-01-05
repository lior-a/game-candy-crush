import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    score: 0,
    date: '',
    moves: 0
}

/**
 * Reducers and actions
 */
const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
      filterUserList: (state, action) => {
        let newState = Object.assign({}, state);
        let filters = action.payload;
        let searchQuery = action.payload.searchQuery

        console.log('game slcie reducer!')
        return newState;
      },
  }
});

/**
 * Selectors
 */

// export const getSearchQuery = (state: IState):string => state.searchQuery;

// export const selectAllUsers = (state: IState):IUser[] => state.users;

// export const countVisibleUsers = (state: IState):number => state.users.filter((user: IUser) => user.isVisible).length;

export default gameSlice;