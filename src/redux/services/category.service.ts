import { store } from 'redux/app/store';

import { baseUrl } from '@constants/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
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
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    category: builder.query<any, any>({
      query: () => ({
        url: `category`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Category'],
    }),
    creatorsCategory: builder.query<any, any>({
      query: () => ({
        url: `creators/category`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Category'],
    }),
  }),
});

export const {useCategoryQuery, useCreatorsCategoryQuery} = categoryApi;
