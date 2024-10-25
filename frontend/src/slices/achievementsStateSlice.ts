import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

const AchievementStateT = z
  .object({
    achievedDate: z.number().nullable().default(null),
  })
  .default({ achievedDate: null });

export type AchievementState = z.infer<typeof AchievementStateT>;

const AchievementsStateT = z.object({
  helloWorldGame: AchievementStateT,
  insectophobia: AchievementStateT,
  newBestFriend: AchievementStateT,
  canBuyLunch: AchievementStateT,
  passiveIncome: AchievementStateT,
  basicallySpecialized: AchievementStateT,
  notADreamJob: AchievementStateT,
  helloWorld: AchievementStateT,
  bugSquasher: AchievementStateT,
  sequelStudio: AchievementStateT,
  buggyMess: AchievementStateT,
  bugOverflow: AchievementStateT,
});
export type AchievementsState = z.infer<typeof AchievementsStateT>;

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
  buggyMess: { achievedDate: null },
  bugOverflow: { achievedDate: null },
};
Object.freeze(defaultInitialState);

const initialState: AchievementsStateSliceType =
  fromLocalStorage === null
    ? { value: defaultInitialState }
    : { value: AchievementsStateT.parse(JSON.parse(fromLocalStorage)) };

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
    enableBuggyMess: (state) => {
      state.value = {
        ...state.value,
        buggyMess: { achievedDate: Date.now() },
      };
    },
    enableBugOverflow: (state) => {
      state.value = {
        ...state.value,
        bugOverflow: { achievedDate: Date.now() },
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
  enableBuggyMess,
  enableBugOverflow,
  resetAchievementsState,
} = achievementsStateSlice.actions;
export const achievementsStateReducer = achievementsStateSlice.reducer;
