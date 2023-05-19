import {store} from 'redux/app/store';

import {baseUrl} from '@constants/utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const reportApi = createApi({
  reducerPath: 'reportApi',
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
  tagTypes: ['Report'],
  endpoints: (builder) => ({
    reportVideo: builder.mutation<any, any>({
      query: (body) => ({
        url: `report/video`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Report'],
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
      invalidatesTags: ['Report'],
    }),

    unSaveVideo: builder.mutation({
      query: (id) => ({
        url: `unsave/${id}`,
        method: 'DELETE',
        // credentials: 'include',
      }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const {
  useReportVideoMutation,
  useSaveVideoMutation,
  useUnSaveVideoMutation,
} = reportApi;
