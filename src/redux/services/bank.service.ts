import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.paystack.co/',
  }),
  tagTypes: ['Bank'],
  endpoints: (builder) => ({
    getBanks: builder.query<any, any>({
      query: () => ({
        url: `bank?currency=NGN`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Bank'],
    }),
  }),
});

export const {useGetBanksQuery} = bankApi;
