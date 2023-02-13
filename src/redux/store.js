import searchStateSlice from "./searchStateSlice";
import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";

export const store = configureStore({
  reducer: {
    searchState: searchStateSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
