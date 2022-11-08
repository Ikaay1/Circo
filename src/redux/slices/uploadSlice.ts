import { createSlice } from '@reduxjs/toolkit';

import type {PayloadAction} from '@reduxjs/toolkit';

type StateType = {
  url: string;
  name: string;
  file: any;
};

const initialState: StateType = {
  url: '',
  name: '',
  file: '',
};

export const uploadSlice = createSlice({
  name: 'uploadReducer',
  initialState,
  reducers: {
    setSources: (state, action) => {
      state.url = action.payload.url;
      state.name = action.payload.name;
      // state.file = action.payload.file;
    },
  },
});

export const {setSources} = uploadSlice.actions;

export default uploadSlice.reducer;
