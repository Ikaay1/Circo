import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  playlistVids: Array<string>;
  route: "upload" | "playlist" | "live";
};

const initialState: StateType = {
  playlistVids: [],
  route: "upload",
};

export const channelSlice = createSlice({
  name: "channelReducer",
  initialState,
  reducers: {
    addPlaylistVideo: (state, action) => {
      state.playlistVids = [...state.playlistVids, action.payload];
    },
    removePlaylistVideo: (state, action) => {
      const newPlaylist = state.playlistVids.filter((each) => {
        return each !== action.payload;
      });
      state.playlistVids = newPlaylist;
    },
    setRoute: (state, action) => {
      state.route = action.payload;
    },
  },
});

export const { addPlaylistVideo, removePlaylistVideo, setRoute } =
  channelSlice.actions;

export default channelSlice.reducer;
