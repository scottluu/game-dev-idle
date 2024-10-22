import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberState } from "../types";
import { getNumberWithDefault } from "../utils";

const initialState: NumberState = {
  value: getNumberWithDefault("office"),
};

const officeSlice = createSlice({
  name: "office",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetOffice: (state) => {
      state.value = 0;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementOffice: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { resetOffice, incrementOffice } = officeSlice.actions;
export const officeReducer = officeSlice.reducer;
