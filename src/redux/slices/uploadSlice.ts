import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  url: string;
  name: string;
};

const initialState: StateType = {
  url: "",
  name: "",
};

export const uploadSlice = createSlice({
  name: "uploadReducer",
  initialState,
  reducers: {
    setSources: (state, action) => {
      state.url = action.payload.url;
      state.name = action.payload.name;
    },
  },
});

export const { setSources } = uploadSlice.actions;

export default uploadSlice.reducer;
