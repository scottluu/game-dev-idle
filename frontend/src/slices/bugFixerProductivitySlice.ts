import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("bugFixerProductivity"),
};

const bugFixerProductivitySlice = createSlice({
  name: "bugFixerProductivity",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementBugFixerProductivity: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incrementBugFixerProductivity } =
  bugFixerProductivitySlice.actions;
export const bugFixerProductivityReducer = bugFixerProductivitySlice.reducer;
