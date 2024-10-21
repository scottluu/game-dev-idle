import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("bugsPerFeature"),
};

const bugsPerFeatureSlice = createSlice({
  name: "bugsPerFeature",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementBugsPerFeature: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetBugsPerFeature: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementBugsPerFeature, resetBugsPerFeature } =
  bugsPerFeatureSlice.actions;
export const bugsPerFeatureReducer = bugsPerFeatureSlice.reducer;
