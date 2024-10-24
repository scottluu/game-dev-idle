import { createSlice } from "@reduxjs/toolkit";

export type AchievementState = {
  achieved: boolean;
};

export type AchievementsState = {
  helloWorldGame: AchievementState;
  insectophobia: AchievementState;
  newBestFriend: AchievementState;
  canBuyLunch: AchievementState;
  passiveIncome: AchievementState;
  basicallySpecialized: AchievementState;
  notADreamJob: AchievementState;
  helloWorld: AchievementState;
  bugSquasher: AchievementState;
  sequelStudio: AchievementState;
};

type AchievementsStateSliceType = {
  value: AchievementsState;
};

const fromLocalStorage = localStorage.getItem("achievementsState");

const defaultInitialState: AchievementsState = {
  helloWorldGame: { achieved: false },
  insectophobia: { achieved: false },
  newBestFriend: { achieved: false },
  canBuyLunch: { achieved: false },
  passiveIncome: { achieved: false },
  basicallySpecialized: { achieved: false },
  notADreamJob: { achieved: false },
  helloWorld: { achieved: false },
  bugSquasher: { achieved: false },
  sequelStudio: { achieved: false },
};

const initialState: AchievementsStateSliceType = {
  value:
    fromLocalStorage === null
      ? defaultInitialState
      : JSON.parse(fromLocalStorage),
};

const achievementsStateSlice = createSlice({
  name: "achievementsState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    enableHelloWorldGame: (state) => {
      state.value = { ...state.value, helloWorldGame: { achieved: true } };
    },
    enableInsectophobia: (state) => {
      state.value = { ...state.value, insectophobia: { achieved: true } };
    },
    enableNewBestFriend: (state) => {
      state.value = { ...state.value, newBestFriend: { achieved: true } };
    },
    enableCanBuyLunch: (state) => {
      state.value = { ...state.value, canBuyLunch: { achieved: true } };
    },
    enablePassiveIncome: (state) => {
      state.value = { ...state.value, passiveIncome: { achieved: true } };
    },
    enableBasicallySpecialized: (state) => {
      state.value = {
        ...state.value,
        basicallySpecialized: { achieved: true },
      };
    },
    enableNotADreamJob: (state) => {
      state.value = { ...state.value, notADreamJob: { achieved: true } };
    },
    enableHelloWorld: (state) => {
      state.value = { ...state.value, helloWorld: { achieved: true } };
    },
    enableBugSquasher: (state) => {
      state.value = { ...state.value, bugSquasher: { achieved: true } };
    },
    enableSequelStudio: (state) => {
      state.value = { ...state.value, sequelStudio: { achieved: true } };
    },
    resetAchievementsState: (state) => {
      state.value = defaultInitialState;
    },
  },
});

export const {
  enableHelloWorldGame,
  enableInsectophobia,
  enableNewBestFriend,
  enableCanBuyLunch,
  enablePassiveIncome,
  enableBasicallySpecialized,
  enableNotADreamJob,
  enableHelloWorld,
  enableBugSquasher,
  enableSequelStudio,
  resetAchievementsState,
} = achievementsStateSlice.actions;
export const achievementsStateReducer = achievementsStateSlice.reducer;
