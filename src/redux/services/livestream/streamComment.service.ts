import { baseUrl } from "@constants/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "redux/app/store";

export const streamCommentAPI = createApi({
  reducerPath: "streamCommentAPI",
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
    getStreamComments: builder.query<any, any>({
      query: (id) => ({
        url: `livestream/comments/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    postCommentOnStream: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream/comment`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
    }),

    likeStreamComment: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream/comment/like`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    replyStreamComment: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream/comment/reply`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    likeCommentReply: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream/comment/reply/like`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    dislikeCommentReply: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream/comment/reply/dislike`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Live"],
    }),

    dislikeStreamComment: builder.mutation<any, any>({
      query: (body) => ({
        url: `livestream/comment/dislike`,
        method: "PUT",
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
  useGetStreamCommentsQuery,
  usePostCommentOnStreamMutation,
  useLikeStreamCommentMutation,
  useDislikeStreamCommentMutation,
  useReplyStreamCommentMutation,
  useLikeCommentReplyMutation,
  useDislikeCommentReplyMutation,
} = streamCommentAPI;
