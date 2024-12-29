import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("hype"),
};

const hypeSlice = createSlice({
  name: "hype",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetHype: (state) => {
      state.value = 0;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementHype: (state, action: PayloadAction<number>) => {
      state.value = Math.max(0, state.value + action.payload);
    },
  },
});

export const { resetHype, incrementHype } = hypeSlice.actions;
export const hypeReducer = hypeSlice.reducer;
