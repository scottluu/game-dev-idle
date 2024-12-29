import { configureStore } from "@reduxjs/toolkit";
import { moneyReducer } from "./slices/moneySlice";
import { bugsReducer } from "./slices/bugsSlice";
import { featuresReducer } from "./slices/featuresSlice";
import { releasedGamesReducer } from "./slices/releasedGamesSlice";
import { featureDevelopersReducer } from "./slices/featureDevelopersSlice";
import { bugFixersReducer } from "./slices/bugFixersSlice";
import { soldCompaniesReducer } from "./slices/soldCompaniesSlice";
import { bugFixerCostReducer } from "./slices/bugFixerCostSlice";
import { bugsPerFeatureReducer } from "./slices/bugsPerFeatureSlice";
import { featureDeveloperCostReducer } from "./slices/featureDeveloperCostSlice";
import { gameProfitabilityReducer } from "./slices/gameProfitabilitySlice";
import { bugFixerProductivityReducer } from "./slices/bugFixerProductivitySlice";
import { featureDeveloperProductivityReducer } from "./slices/featureDeveloperProductivitySlice";
import { clickingStrengthReducer } from "./slices/clickingStrengthSlice";
import { officeReducer } from "./slices/officeSlice";
import { achievementsStateReducer } from "./slices/achievementsStateSlice";
import { numClicksReducer } from "./slices/numClicksSlice";
import { hypeReducer } from "./slices/hypeSlice";

export const store = configureStore({
  reducer: {
    money: moneyReducer,
    bugs: bugsReducer,
    hype: hypeReducer,
    features: featuresReducer,
    releasedGames: releasedGamesReducer,
    featureDevelopers: featureDevelopersReducer,
    bugFixers: bugFixersReducer,
    soldCompanies: soldCompaniesReducer,
    bugFixerCost: bugFixerCostReducer,
    bugFixerProductivity: bugFixerProductivityReducer,
    bugsPerFeature: bugsPerFeatureReducer,
    featureDeveloperCost: featureDeveloperCostReducer,
    featureDeveloperProductivity: featureDeveloperProductivityReducer,
    gameProfitability: gameProfitabilityReducer,
    clickingStrength: clickingStrengthReducer,
    office: officeReducer,
    achievementsState: achievementsStateReducer,
    numClicks: numClicksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
