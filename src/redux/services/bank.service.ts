import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flutterwave.com/',
  }),
  tagTypes: ['Bank'],
  endpoints: (builder) => ({
    getBanks: builder.query<any, any>({
      query: () => ({
        url: `v3/banks/NG`,
        method: 'GET',
        headers: {
          Authorization:
            'Bearer FLWSECK_TEST-d7eecc595c1f8a5c3a8ab17ee5dda128-X',
        },
      }),
      providesTags: ['Bank'],
    }),
  }),
});

export const {useGetBanksQuery} = bankApi;
