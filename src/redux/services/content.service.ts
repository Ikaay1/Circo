import {store} from 'redux/app/store';

import {baseUrl} from '@constants/utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
      query: ({page, limit, categoryId}) => ({
        url: `content/upload-video/category/${categoryId}?page=${page}&limit=${limit}`,
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
      query: ({
        id,
        page,
        limit,
      }: {
        id: string;
        page: number;
        limit: number;
      }) => ({
        url: `comment/${id}?page=${page}&limit=${limit}`,
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

    replyComment: builder.mutation<any, any>({
      query: (body) => ({
        url: `comment/reply`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    getUserContents: builder.query<any, any>({
      query: ({page, limit}) => ({
        url: `content/channel/?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    getSingleUserContent: builder.query<any, any>({
      query: ({id, page, limit}) => ({
        url: `content/channel/${id}/?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),
    getSearchSuggestion: builder.query<any, any>({
      query: (search) => ({
        url: `content/searchSuggestions?search=${search}`,
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

    likeReply: builder.mutation<any, any>({
      query: (body) => ({
        url: `comment/reply/like`,
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

    dislikeReply: builder.mutation<any, any>({
      query: (body) => ({
        url: `comment/reply/dislike`,
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

    unSaveVideo: builder.mutation({
      query: (id) => ({
        url: `unsave/${id}`,
        method: 'DELETE',
        // credentials: 'include',
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
      query: ({page, limit, search, categoryId}) => ({
        url: `content/search/${categoryId}?page=${page}&limit=${limit}&search=${search}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),
    getUsersBySearch: builder.query<any, any>({
      query: (search) => {
        return {
          url: `content/searchUser?search=${search}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      providesTags: ['Content'],
    }),
    getUsersSearch: builder.query<any, any>({
      query: (search) => ({
        url: `content/userSearch?search=${search}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    getDiscover: builder.query<any, any>({
      query: ({page, limit}) => ({
        url: `content/discover?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    getTrending: builder.query<any, any>({
      query: ({page, limit}) => ({
        url: `content/most-watched?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    getSearchHistory: builder.query<any, any>({
      query: ({page, limit}) => ({
        url: `content/search-history?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    expiredSubscription: builder.mutation<any, any>({
      query: (body) => ({
        url: `subscribe/reset`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    subscribeToUserChannel: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/transfer/subscribe`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    getCounts: builder.query<any, any>({
      query: () => ({
        url: `like/likesCount`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),

    deleteContentComment: builder.mutation({
      query: (id) => ({
        url: `comment/delete/${id}`,
        method: 'DELETE',
        // credentials: 'include',
      }),
      invalidatesTags: ['Content'],
    }),

    deleteReply: builder.mutation<any, any>({
      query: (body) => ({
        url: `comment/reply/delete`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
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
  useGetSingleUserContentQuery,
  useGetDiscoverQuery,
  useGetTrendingQuery,
  useGetSearchHistoryQuery,
  useExpiredSubscriptionMutation,
  useGetCountsQuery,
  useDeleteContentCommentMutation,
  useUnSaveVideoMutation,
  useLikeReplyMutation,
  useDislikeReplyMutation,
  useDeleteReplyMutation,
  useReplyCommentMutation,
  useSubscribeToUserChannelMutation,
  useGetUsersBySearchQuery,
  useGetUsersSearchQuery,
  useGetSearchSuggestionQuery,
} = contentApi;
