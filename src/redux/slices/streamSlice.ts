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
  },
});

export const { setStreamDetails, setSelectedStream } = streamSlice.actions;

export default streamSlice.reducer;
