import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("gameProfitability"),
};

const gameProfitabilitySlice = createSlice({
  name: "gameProfitability",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementGameProfitability: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetGameProfitability: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementGameProfitability, resetGameProfitability } =
  gameProfitabilitySlice.actions;
export const gameProfitabilityReducer = gameProfitabilitySlice.reducer;
