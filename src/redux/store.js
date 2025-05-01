import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import profileReducer from "./slices/profile";

const reducer = {
  auth: authReducer,
  profile: profileReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
