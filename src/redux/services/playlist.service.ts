import { baseUrl } from "@constants/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "redux/app/store";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = store.getState()?.app?.userReducer.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["playlist"],
  endpoints: (builder) => ({
    createPlaylist: builder.mutation<any, any>({
      query: (body) => ({
        url: `playlist/create`,
        method: "POST",
        headers: {},
        body: body,
      }),
      invalidatesTags: ["playlist"],
    }),

    getPlaylist: builder.query<any, any>({
      query: (id) => ({
        url: `playlist/${id}`,
        method: "GET",
      }),
      providesTags: ["playlist"],
    }),
    getSinglePlaylist: builder.query<any, any>({
      query: (id) => ({
        url: `playlist/single/${id}`,
        method: "GET",
      }),
      providesTags: ["playlist"],
    }),
  }),
});

export const { useGetPlaylistQuery, useGetSinglePlaylistQuery } = playlistApi;
