import { store } from 'redux/app/store';

import { baseUrl } from '@constants/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${store.getState().app.userReducer.token}`,
      );
      return headers;
    },
  }),
  tagTypes: ['Content'],
  endpoints: (builder) => ({
    createContent: builder.mutation<any, any>({
      query: (body) => ({
        url: `content/upload-video`,
        method: 'POST',
        headers: {},
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    getContents: builder.query<any, any>({
      query: ({page, limit}) => ({
        url: `content/upload-video?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    getContent: builder.query<any, any>({
      query: (id) => ({
        url: `content/upload-video/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    getContentComments: builder.query<any, any>({
      query: (id) => ({
        url: `comment/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    postCommentOnContent: builder.mutation<any, any>({
      query: (body) => ({
        url: `comment`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    getUserContents: builder.query<any, any>({
      query: () => ({
        url: `content/channel`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    createView: builder.mutation<any, any>({
      query: (body) => ({
        url: `content/view`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    likeContent: builder.mutation<any, any>({
      query: (body) => ({
        url: `content/like`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    dislikeContent: builder.mutation<any, any>({
      query: (body) => ({
        url: `content/dislike`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),
    likeContentComment: builder.mutation<any, any>({
      query: (body) => ({
        url: `comment/like`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    dislikeContentComment: builder.mutation<any, any>({
      query: (body) => ({
        url: `comment/dislike`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    saveVideo: builder.mutation<any, any>({
      query: (body) => ({
        url: `save`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    reportComment: builder.mutation<any, any>({
      query: (body) => ({
        url: `report`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    getContentsBySearch: builder.query<any, any>({
      query: ({page, limit, search}) => ({
        url: `content/search?page=${page}&limit=${limit}&search=${search}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    getContentsByCategory: builder.query<any, any>({
      query: ({page, limit, categoryId}) => ({
        url: `content/upload-video/category/${categoryId}?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),
  }),
});

export const {
  useGetContentsQuery,
  useGetContentQuery,
  useGetContentCommentsQuery,
  usePostCommentOnContentMutation,
  useGetUserContentsQuery,
  useCreateViewMutation,
  useCreateContentMutation,
  useLikeContentMutation,
  useDislikeContentMutation,
  useLikeContentCommentMutation,
  useDislikeContentCommentMutation,
  useSaveVideoMutation,
  useReportCommentMutation,
  useGetContentsBySearchQuery,
  useGetContentsByCategoryQuery,
} = contentApi;
