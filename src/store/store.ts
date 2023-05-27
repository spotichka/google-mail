import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.ts";
import { mailAPI } from "../api/mail-api.ts";

export const rootReducer = combineReducers({
  userReducer,
  [mailAPI.reducerPath]: mailAPI.reducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mailAPI.middleware),
  });
};
