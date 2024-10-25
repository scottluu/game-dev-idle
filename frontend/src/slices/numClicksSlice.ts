import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNumberWithDefault } from "../utils";

const initialState = {
  dayJob: getNumberWithDefault("numDayJobClicks"),
  bugFix: getNumberWithDefault("numBugFixClicks"),
  featureDevelopment: getNumberWithDefault("numFeatureDevelopmentClicks"),
};

const numClicksSlice = createSlice({
  name: "numDayJobClicks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementNumDayJobClicks: (state, action: PayloadAction<number>) => {
      state.dayJob += action.payload;
    },
    incrementNumBugFixClicks: (state, action: PayloadAction<number>) => {
      state.bugFix += action.payload;
    },
    incrementNumFeatureDevelopmentClicks: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.featureDevelopment += action.payload;
    },
    resetClicks: (state) => {
      state.dayJob = 0;
      state.bugFix = 0;
      state.featureDevelopment = 0;
    },
  },
});

export const {
  incrementNumDayJobClicks,
  incrementNumBugFixClicks,
  incrementNumFeatureDevelopmentClicks,
  resetClicks,
} = numClicksSlice.actions;
export const numClicksReducer = numClicksSlice.reducer;
