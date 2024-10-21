import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("clickingStrength"),
};

const clickingStrengthSlice = createSlice({
  name: "clickingStrength",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementClickingStrength: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetClickingStrength: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementClickingStrength, resetClickingStrength } =
  clickingStrengthSlice.actions;
export const clickingStrengthReducer = clickingStrengthSlice.reducer;
