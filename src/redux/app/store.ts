
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import channelReducer from "redux/slices/channelSlice"
import storage from "redux-persist/lib/storage";
import { authApi } from "redux/services/auth.service";
import { categoryApi } from "redux/services/category.service";
import { contentApi } from "redux/services/content.service";
import userReducer from "redux/slices/authSlice";
import streamReducer from "redux/slices/streamSlice";
import uploadReducer from "redux/slices/uploadSlice";

import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { channelApi } from "redux/services/channel.service";
import { liveAPI } from "redux/services/live.service";
import { userApi } from "redux/services/user.service";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userReducer: userReducer,
  upload: uploadReducer,
  stream: streamReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: {
    app: persistedReducer,
    upload: uploadReducer,
    [authApi.reducerPath]: authApi.reducer,
    [liveAPI.reducerPath]: liveAPI.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    channel: channelReducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
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
