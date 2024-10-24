import { createSlice } from "@reduxjs/toolkit";

export type AchievementState = {
  achievedDate: number | null;
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
  helloWorldGame: { achievedDate: null },
  insectophobia: { achievedDate: null },
  newBestFriend: { achievedDate: null },
  canBuyLunch: { achievedDate: null },
  passiveIncome: { achievedDate: null },
  basicallySpecialized: { achievedDate: null },
  notADreamJob: { achievedDate: null },
  helloWorld: { achievedDate: null },
  bugSquasher: { achievedDate: null },
  sequelStudio: { achievedDate: null },
};
Object.freeze(defaultInitialState);

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
      state.value = {
        ...state.value,
        helloWorldGame: { achievedDate: Date.now() },
      };
    },
    enableInsectophobia: (state) => {
      state.value = {
        ...state.value,
        insectophobia: { achievedDate: Date.now() },
      };
    },
    enableNewBestFriend: (state) => {
      state.value = {
        ...state.value,
        newBestFriend: { achievedDate: Date.now() },
      };
    },
    enableCanBuyLunch: (state) => {
      state.value = {
        ...state.value,
        canBuyLunch: { achievedDate: Date.now() },
      };
    },
    enablePassiveIncome: (state) => {
      state.value = {
        ...state.value,
        passiveIncome: { achievedDate: Date.now() },
      };
    },
    enableBasicallySpecialized: (state) => {
      state.value = {
        ...state.value,
        basicallySpecialized: { achievedDate: Date.now() },
      };
    },
    enableNotADreamJob: (state) => {
      state.value = {
        ...state.value,
        notADreamJob: { achievedDate: Date.now() },
      };
    },
    enableHelloWorld: (state) => {
      state.value = {
        ...state.value,
        helloWorld: { achievedDate: Date.now() },
      };
    },
    enableBugSquasher: (state) => {
      state.value = {
        ...state.value,
        bugSquasher: { achievedDate: Date.now() },
      };
    },
    enableSequelStudio: (state) => {
      state.value = {
        ...state.value,
        sequelStudio: { achievedDate: Date.now() },
      };
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
