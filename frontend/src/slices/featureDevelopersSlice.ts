import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkerState } from "../types";
import { getBooleanWithDefault, getNumberWithDefault } from "../utils";

const initialState: WorkerState = {
  value: getNumberWithDefault("featureDevelopers"),
  enabled: getBooleanWithDefault("featureDevelopers.enabled"),
};

const featureDevelopersSlice = createSlice({
  name: "featureDevelopers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementFeatureDevelopers: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    toggleFeatureDevelopers: (state) => {
      state.enabled = !state.enabled;
    },
    resetFeatureDevelopers: (state) => {
      state.value = 0;
      state.enabled = true;
    },
  },
});

export const {
  incrementFeatureDevelopers,
  toggleFeatureDevelopers,
  resetFeatureDevelopers,
} = featureDevelopersSlice.actions;
export const featureDevelopersReducer = featureDevelopersSlice.reducer;
