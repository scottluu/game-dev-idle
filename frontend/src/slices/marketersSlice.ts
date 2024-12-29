import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkerState } from "../types";
import { getBooleanWithDefault, getNumberWithDefault } from "../utils";

const initialState: WorkerState = {
  value: getNumberWithDefault("marketers"),
  enabled: getBooleanWithDefault("marketers.enabled"),
};

const marketersSlice = createSlice({
  name: "marketers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementMarketers: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    toggleMarketers: (state) => {
      state.enabled = !state.enabled;
    },
    resetMarketers: (state) => {
      state.value = 0;
      state.enabled = true;
    },
  },
});

export const { incrementMarketers, toggleMarketers, resetMarketers } =
  marketersSlice.actions;
export const marketerReducer = marketersSlice.reducer;
