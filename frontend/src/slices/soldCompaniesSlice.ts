import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStats } from "../types";

interface CompanyStats {
  gameStats: GameStats[];
  name: string;
}

interface SoldCompanies {
  value: CompanyStats[];
}

const fromLocalStorage = localStorage.getItem("soldCompanies");

const initialState: SoldCompanies = {
  value:
    fromLocalStorage === null
      ? []
      : (JSON.parse(fromLocalStorage) as CompanyStats[]),
};

const soldCompaniesSlice = createSlice({
  name: "soldCompanies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    appendCompany: (state, action: PayloadAction<CompanyStats>) => {
      state.value = [...state.value, action.payload];
    },
    resetSoldCompanies: (state) => {
      state.value = [];
    },
  },
});

export const { appendCompany, resetSoldCompanies } = soldCompaniesSlice.actions;
export const soldCompaniesReducer = soldCompaniesSlice.reducer;
