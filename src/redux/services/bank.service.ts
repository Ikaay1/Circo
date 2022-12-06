import { store } from 'redux/app/store';

import { baseUrl } from '@constants/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bankApi = createApi({
  reducerPath: 'bankApi',
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
  tagTypes: ['Bank'],
  endpoints: (builder) => ({
    getBanks: builder.query<any, any>({
      query: () => ({
        url: `banks`,
        method: 'GET',
      }),
      providesTags: ['Bank'],
    }),

    flutterwavePayment: builder.mutation<any, any>({
      query: (body) => ({
        url: `flutterwave`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Bank'],
    }),
  }),
});

export const {useGetBanksQuery, useFlutterwavePaymentMutation} = bankApi;
