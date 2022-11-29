import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserProps {
  token: null | string;
  userProfile: null | any;
}

const initialState: IUserProps = {
  token: null,
  userProfile: null,
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { payload } }: PayloadAction<{ payload: any }>
    ) => {
      state.token = payload.token;
      state.userProfile = payload.data;
    },
    setUser: (
      state,
      { payload: { payload } }: PayloadAction<{ payload: any }>
    ) => {
      state.userProfile = payload;
    },
    logout: () => {
      console.log("logout");

      return initialState;
    },
  },
});

export const { setCredentials, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
