import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "redux/services/auth.service";
import { categoryApi } from "redux/services/category.service";
import { contentApi } from "redux/services/content.service";
import userReducer from "redux/slices/authSlice";
import contentReducer from "redux/slices/contentSlice";
import uploadReducer from "redux/slices/uploadSlice";
import channelReducer from "redux/slices/channelSlice"

import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { channelApi } from "redux/services/channel.service";

const persistConfig = {
  key: "root",
  storage,
};

// const persistedReducer = persistReducer(persistConfig, userReducer);

// const uploadPersit = persistReducer(persistConfig, uploadReducer);

const rootReducer = combineReducers({
  userReducer: userReducer,
  upload: uploadReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    // userReducer: persistedReducer,
    app: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    // upload: uploadPersit,
    [categoryApi.reducerPath]: categoryApi.reducer,
    content: contentReducer,
    [contentApi.reducerPath]: contentApi.reducer,
    channel: channelReducer,
    [channelApi.reducerPath]: channelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authApi.middleware,
      categoryApi.middleware,
      contentApi.middleware,
      channelApi.middleware,
    ]),
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
