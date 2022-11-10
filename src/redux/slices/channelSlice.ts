import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  channel: {},
  hasChannel: false,
};

export const channelSlice = createSlice({
  name: "channelReducer",
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload.channel;
      state.hasChannel = true;
    },
    setHasChannel: (state, action) => {
      state.hasChannel = true;
    },
  },
});

export const { setChannel, setHasChannel } = channelSlice.actions;

export default channelSlice.reducer;
