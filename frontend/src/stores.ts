import { configureStore } from "@reduxjs/toolkit";
import { moneyReducer } from "./slices/moneySlice";
import { bugsReducer } from "./slices/bugsSlice";
import { featuresReducer } from "./slices/featuresSlice";
import { releasedGamesReducer } from "./slices/releasedGamesSlice";
import { featureDevelopersReducer } from "./slices/featureDevelopersSlice";
import { bugFixersReducer } from "./slices/bugFixersSlice";

export const store = configureStore({
  reducer: {
    money: moneyReducer,
    bugs: bugsReducer,
    features: featuresReducer,
    releasedGames: releasedGamesReducer,
    featureDevelopers: featureDevelopersReducer,
    bugFixers: bugFixersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
