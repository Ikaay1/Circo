import { createSlice } from '@reduxjs/toolkit';

import type {PayloadAction} from '@reduxjs/toolkit';

export interface IUserProps {
  token: null | string;
  userProfile: null | any;
}

const initialState: IUserProps = {
  token: null,
  userProfile: null,
};

export const contentSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {payload: {payload}}: PayloadAction<{payload: any}>,
    ) => {
      state.token = payload.token;
      state.userProfile = payload.data;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const {setCredentials, logout} = contentSlice.actions;

export default contentSlice.reducer;
