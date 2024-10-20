import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("money"),
};

const moneySlice = createSlice({
  name: "money",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementMoney: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetMoney: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementMoney, resetMoney } = moneySlice.actions;
export const moneyReducer = moneySlice.reducer;
