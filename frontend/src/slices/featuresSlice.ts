import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("features"),
};

const featuresSlice = createSlice({
  name: "features",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetFeatures: (state) => {
      state.value = 0;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementFeatures: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { resetFeatures, incrementFeatures } = featuresSlice.actions;
export const featuresReducer = featuresSlice.reducer;
