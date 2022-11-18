import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserProps {
  streamDetails: null | any;
  selectedStream: null | any;
}

const initialState: IUserProps = {
  streamDetails: null,
  selectedStream: null,
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

    clearStreamDetails: (state) => {
      state.streamDetails = null;
    },
    clearSelectedStream: (state) => {
      state.selectedStream = null;
    },
  },
});

export const { setStreamDetails, setSelectedStream, clearStreamDetails } =
  streamSlice.actions;

export default streamSlice.reducer;
