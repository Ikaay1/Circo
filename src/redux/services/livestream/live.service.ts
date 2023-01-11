import { baseUrl, data } from "@constants/utils";
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

    createSpace: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream/create-mux-spaces`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    startBroadCast: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream/space-broadcast`,
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

    getUserPaidStream: builder.query<any, any>({
      query: (id) => ({
        url: `livestream/userspaidlive`,
        method: "GET",
      }),
      providesTags: ["Live"],
    }),

    getUserLiveStream: builder.query<any, any>({
      query: (id) => ({
        url: `livestream/liverecordings/${id}`,
        method: "GET",
      }),
      providesTags: ["Live"],
    }),

    getAllLiveStream: builder.query<any, any>({
      query: (type) => ({
        url: `livestream/?paid=${type?.paid}&ongoing=${type?.ongoing}&search=${type?.search}`,
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
        url: `livestream/view`,
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
        url: `livestream/like`,
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
        url: `livestream/dislike`,
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

    payForLive: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/transfer/live`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    updateEvent: builder.mutation<any, any>({
      query: (data) => ({
        url: `event/update/${data.id}`,
        method: "PATCH",
        headers: {},
        body: data.body,
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
  useUpdateEventMutation,
  useGetUserPaidStreamQuery,
  usePayForLiveMutation,
  useGetUserLiveStreamQuery,
  useCreateSpaceMutation,
  useStartBroadCastMutation,
} = liveAPI;
