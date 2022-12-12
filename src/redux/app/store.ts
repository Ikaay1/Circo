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
import storage from 'redux-persist/lib/storage';
import { authApi } from 'redux/services/auth.service';
import { bankApi } from 'redux/services/bank.service';
import { beneficiaryApi } from 'redux/services/beneficiary.service';
import { categoryApi } from 'redux/services/category.service';
import { channelApi } from 'redux/services/channel.service';
import { contentApi } from 'redux/services/content.service';
import { liveAPI } from 'redux/services/livestream/live.service';
import { streamCommentAPI } from 'redux/services/livestream/streamComment.service';
import { notificationApi } from 'redux/services/notification.service';
import { playlistApi } from 'redux/services/playlist.service';
import { settingsApi } from 'redux/services/settings.service';
import { userApi } from 'redux/services/user.service';
import { walletApi } from 'redux/services/wallet.service';
import userReducer from 'redux/slices/authSlice';
import categoryReducer from 'redux/slices/categorySlice';
import streamReducer from 'redux/slices/streamSlice';
import uploadReducer from 'redux/slices/uploadSlice';

import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const persistConfig = {
  key: 'root',
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
    category: categoryReducer,
    [authApi.reducerPath]: authApi.reducer,
    [liveAPI.reducerPath]: liveAPI.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [streamCommentAPI.reducerPath]: streamCommentAPI.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [beneficiaryApi.reducerPath]: beneficiaryApi.reducer,
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
      playlistApi.middleware,
      liveAPI.middleware,
      userApi.middleware,
      streamCommentAPI.middleware,
      settingsApi.middleware,
      walletApi.middleware,
      bankApi.middleware,
      notificationApi.middleware,
      beneficiaryApi.middleware,
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
