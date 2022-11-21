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
        headers: {},
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

    getLiveStream: builder.query<any, any>({
      query: () => ({
        url: `livestream/user/${
          store.getState()?.app?.userReducer?.userProfile?._id
        }`,
        method: "GET",
      }),
      providesTags: ["Live"],
    }),

    getStream: builder.query<any, any>({
      query: (id) => ({
        url: `livestream/${id}`,
        method: "GET",
      }),
      providesTags: ["Live"],
    }),

    getAllLiveStream: builder.query<any, any>({
      query: (type) => ({
        url: `livestream/?paid=${type?.paid}&ongoing=${type?.ongoing}`,
        method: "GET",
      }),
      providesTags: ["Live"],
    }),

    startStream: builder.mutation<any, any>({
      query: (id) => ({
        url: `livestream/start/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Live"],
    }),

    endStream: builder.mutation<any, any>({
      query: (id) => ({
        url: `livestream/end/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Live"],
    }),

    createView: builder.mutation<any, any>({
      query: (body) => ({
        url: `content/view`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    likeStream: builder.mutation<any, any>({
      query: (body) => ({
        url: `content/like`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    dislikeStream: builder.mutation<any, any>({
      query: (body) => ({
        url: `content/dislike`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    reportComment: builder.mutation<any, any>({
      query: (body) => ({
        url: `report`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useCreateLiveStreamMutation,
  useGetLiveStreamQuery,
  useGetAllLiveStreamQuery,
  useGetStreamQuery,
  useStartStreamMutation,
  useEndStreamMutation,
  useCreateViewMutation,
  useLikeStreamMutation,
  useDislikeStreamMutation,
  useReportCommentMutation,
} = liveAPI;
