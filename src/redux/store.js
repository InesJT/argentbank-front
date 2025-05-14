import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import profileReducer from "./slices/profile";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, profileReducer);

const reducer = {
  auth: authReducer,
  profile: persistedReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export const persistor = persistStore(store);
