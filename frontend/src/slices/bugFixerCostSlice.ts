import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("bugFixerCost"),
};

const bugFixerCostSlice = createSlice({
  name: "bugFixerCost",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementBugFixerCost: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetBugFixerCost: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementBugFixerCost, resetBugFixerCost } =
  bugFixerCostSlice.actions;
export const bugFixerCostReducer = bugFixerCostSlice.reducer;
