import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authApi } from "redux/services/auth.service";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "redux/slices/authSlice";
import uploadReducer from "redux/slices/uploadSlice";
import storage from "redux-persist/lib/storage";
import { liveAPI } from "redux/services/live.service";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const uploadPersit = persistReducer(persistConfig, uploadReducer);

export const store = configureStore({
  reducer: {
    userReducer: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    upload: uploadPersit,
    [liveAPI.reducerPath]: liveAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware]),
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
