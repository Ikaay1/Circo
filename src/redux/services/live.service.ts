import { baseUrl } from "@constants/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "redux/app/store";

export const liveAPI = createApi({
  reducerPath: "liveAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = store.getState()?.app?.userReducer.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["Live"],
  endpoints: (builder) => ({
    createEvent: builder.mutation<any, any>({
      query: (body) => ({
        url: `event/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    createLiveStream: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),
  }),
});

export const { useCreateEventMutation } = liveAPI;
