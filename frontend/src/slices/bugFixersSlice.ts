import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkerState } from "../types";
import { getBooleanWithDefault, getNumberWithDefault } from "../utils";

const initialState: WorkerState = {
  value: getNumberWithDefault("bugFixers"),
  enabled: getBooleanWithDefault("bugFixers.enabled"),
};

const bugFixersSlice = createSlice({
  name: "bugFixers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementBugFixers: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    toggleBugFixers: (state) => {
      state.enabled = !state.enabled;
    },
    resetBugFixers: (state) => {
      state.value = 0;
      state.enabled = true;
    },
  },
});

export const { incrementBugFixers, toggleBugFixers, resetBugFixers } =
  bugFixersSlice.actions;
export const bugFixersReducer = bugFixersSlice.reducer;
