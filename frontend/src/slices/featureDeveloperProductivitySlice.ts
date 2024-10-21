import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("featureDeveloperProductivity"),
};

const featureDeveloperProductivitySlice = createSlice({
  name: "featureDeveloperProductivity",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementFeatureDeveloperProductivity: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.value += action.payload;
    },
    resetFeatureDeveloperProductivity: (state) => {
      state.value = 0;
    },
  },
});

export const {
  incrementFeatureDeveloperProductivity,
  resetFeatureDeveloperProductivity,
} = featureDeveloperProductivitySlice.actions;
export const featureDeveloperProductivityReducer =
  featureDeveloperProductivitySlice.reducer;
