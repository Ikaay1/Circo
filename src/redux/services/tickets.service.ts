import {store} from 'redux/app/store';

import {baseUrl} from '@constants/utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = store.getState()?.app?.userReducer.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Tickets'],
  endpoints: (builder) => ({
    postTicket: builder.mutation<any, any>({
      query: (body) => ({
        url: `tickets`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Tickets'],
    }),
  }),
});

export const {usePostTicketMutation} = ticketsApi;
