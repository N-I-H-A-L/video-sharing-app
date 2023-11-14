//Using redux persist, it will store the information in the "Local Storage" of the browser and User will still be logged in even after refreshing the page.
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import videoReducer from "./videoSlice.js";

const rootReducer = combineReducers({ user: userReducer, video: videoReducer });

export const store = configureStore({
  reducer: rootReducer,
});
