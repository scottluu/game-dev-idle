import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkerState } from "../types";
import { getBooleanWithDefault, getNumberWithDefault } from "../utils";

const initialState: WorkerState = {
  value: getNumberWithDefault("accountants"),
  enabled: getBooleanWithDefault("accountants.enabled"),
};

const accountantsSlice = createSlice({
  name: "accountants",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementAccountants: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    toggleAccountants: (state) => {
      state.enabled = !state.enabled;
    },
    resetAccountants: (state) => {
      state.value = 0;
      state.enabled = true;
    },
  },
});

export const { incrementAccountants, toggleAccountants, resetAccountants } =
  accountantsSlice.actions;
export const accountantsReducer = accountantsSlice.reducer;
