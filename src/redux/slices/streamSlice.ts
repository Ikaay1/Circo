import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserProps {
  streamDetails: null | any;
}

const initialState: IUserProps = {
  streamDetails: null,
};

export const streamSlice = createSlice({
  name: "streamReducer",
  initialState,
  reducers: {
    setStreamDetails: (
      state,
      { payload: { payload } }: PayloadAction<{ payload: any }>
    ) => {
      console.log("payload", payload);

      state.streamDetails = payload;
    },
  },
});

export const { setStreamDetails } = streamSlice.actions;

export default streamSlice.reducer;
