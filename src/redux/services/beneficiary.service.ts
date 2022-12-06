import { store } from 'redux/app/store';

import { baseUrl } from '@constants/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const beneficiaryApi = createApi({
  reducerPath: 'beneficiaryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = store.getState()?.app?.userReducer?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Beneficiary'],
  endpoints: (builder) => ({
    confirmAccount: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/confirmAccount`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Beneficiary'],
    }),

    sendOTP: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/get-otp`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Beneficiary'],
    }),
  }),
});

export const {useConfirmAccountMutation, useSendOTPMutation} = beneficiaryApi;
