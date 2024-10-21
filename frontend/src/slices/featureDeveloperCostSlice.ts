import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("featureDeveloperCost"),
};

const featureDeveloperCostSlice = createSlice({
  name: "featureDeveloperCost",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementFeatureDeveloperCost: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetFeatureDeveloperCost: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementFeatureDeveloperCost, resetFeatureDeveloperCost } =
  featureDeveloperCostSlice.actions;
export const featureDeveloperCostReducer = featureDeveloperCostSlice.reducer;
