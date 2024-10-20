import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStats } from "../types";

interface ReleasedGames {
  value: GameStats[];
}

const fromLocalStorage = localStorage.getItem("releasedGames");

const initialState: ReleasedGames = {
  value:
    fromLocalStorage === null
      ? []
      : (JSON.parse(fromLocalStorage) as GameStats[]),
};

const releasedGamesSlice = createSlice({
  name: "releasedGames",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    appendReleasedGame: (state, action: PayloadAction<GameStats>) => {
      state.value = [...state.value, action.payload];
    },
    resetReleasedGames: (state) => {
      state.value = [];
    },
  },
});

export const { appendReleasedGame, resetReleasedGames } =
  releasedGamesSlice.actions;
export const releasedGamesReducer = releasedGamesSlice.reducer;
