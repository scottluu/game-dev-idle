import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("bugs"),
};

const bugsSlice = createSlice({
  name: "bugs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetBugs: (state) => {
      state.value = 0;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementBugs: (state, action: PayloadAction<number>) => {
      state.value = Math.max(0, state.value + action.payload);
    },
  },
});

export const { resetBugs, incrementBugs } = bugsSlice.actions;
export const bugsReducer = bugsSlice.reducer;
