import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("marketerCost"),
};

const marketerCostSlice = createSlice({
  name: "marketerCost",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementMarketerCost: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetMarketerCost: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementMarketerCost, resetMarketerCost } =
  marketerCostSlice.actions;
export const marketerCostReducer = marketerCostSlice.reducer;
