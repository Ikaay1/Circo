import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserProps {
  streamDetails: null | any;
  selectedStream: null | any;
  webCamStream: null | any;
}

const initialState: IUserProps = {
  streamDetails: null,
  selectedStream: null,
  webCamStream: null,
};

export const streamSlice = createSlice({
  name: "streamReducer",
  initialState,
  reducers: {
    setStreamDetails: (
      state,
      { payload: { payload } }: PayloadAction<{ payload: any }>
    ) => {
      state.streamDetails = payload;
    },

    setSelectedStream: (
      state,
      { payload: { payload } }: PayloadAction<{ payload: any }>
    ) => {
      state.selectedStream = payload;
    },

    setWebCamStream: (
      state,
      { payload: { payload } }: PayloadAction<{ payload: any }>
    ) => {
      state.webCamStream = payload;
    },

    clearStreamDetails: (state) => {
      state.streamDetails = null;
    },
    clearSelectedStream: (state) => {
      state.selectedStream = null;
    },

    clearWebCamStream: (state) => {
      state.webCamStream = null;
    },
  },
});

export const {
  setStreamDetails,
  setSelectedStream,
  clearStreamDetails,
  setWebCamStream,
  clearWebCamStream,
} = streamSlice.actions;

export default streamSlice.reducer;
