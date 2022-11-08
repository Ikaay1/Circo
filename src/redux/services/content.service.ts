import { store } from 'redux/app/store';

import { baseUrl } from '@constants/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ContentApi = createApi({
  reducerPath: 'ContentApi',
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
    uploadContent: builder.mutation<any, any>({
      query: (body) => ({
        url: `content/upload-video`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Content'],
    }),

    getContents: builder.query<any, any>({
      query: () => ({
        url: `/content/uploaded-video`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Content'],
    }),
  }),
});

export const {useUploadContentMutation, useGetContentMutation} = ContentApi;
