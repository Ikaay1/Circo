import { store } from 'redux/app/store';

import { baseUrl } from '@constants/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelApi = createApi({
  reducerPath: 'channelApi',
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
  tagTypes: ['channel'],
  endpoints: (builder) => ({
    updateChannel: builder.mutation<any, any>({
      query: (body) => ({
        url: `channel/update`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['channel'],
    }),
    getChannel: builder.query<any, any>({
      query: () => ({
        url: `/channel`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['channel'],
    }),
    getIndividualChannel: builder.query<any, any>({
      query: (userId) => ({
        url: `/channel/${userId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['channel'],
    }),

    resetSubscriptions: builder.mutation<any, any>({
      query: (body) => ({
        url: `subscribe/reset`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['channel'],
    }),
  }),
});

export const {
  useUpdateChannelMutation,
  useGetChannelQuery,
  useGetIndividualChannelQuery,
  useResetSubscriptionsMutation,
} = channelApi;
