import {store} from 'redux/app/store';

import {baseUrl} from '@constants/utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    subscribe: builder.mutation<any, any>({
      query: (body) => ({
        url: `subscribe`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['User'],
    }),

    getUser: builder.query<any, any>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: `users/update`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),

    getSuggestedUsers: builder.query<any, any>({
      query: ({page, limit}) => ({
        url: `content/suggested?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['User'],
    }),

    changePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: `users/change/password`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['User'],
    }),

    getPopularCreators: builder.query<any, any>({
      query: () => ({
        url: `content/popular-creators`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['User'],
    }),

    getSubscriptions: builder.query<any, any>({
      query: ({page, limit, search}) => ({
        url: search
          ? `content/subscriptions?page=${page}&limit=${limit}&search=${search}`
          : `content/subscriptions?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['User'],
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
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSubscribeMutation,
  useGetUserQuery,
  useUpdateProfileMutation,
  useGetSuggestedUsersQuery,
  useGetPopularCreatorsQuery,
  useChangePasswordMutation,
  useGetSubscriptionsQuery,
  useExpiredSubscriptionMutation,
} = userApi;
