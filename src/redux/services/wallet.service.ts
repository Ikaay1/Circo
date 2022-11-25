import { store } from 'redux/app/store';

import { baseUrl } from '@constants/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const walletApi = createApi({
  reducerPath: 'walletApi',
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
  tagTypes: ['Wallet'],
  endpoints: (builder) => ({
    depositToWallet: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/deposit`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Wallet'],
    }),

    getUserWallet: builder.query<any, any>({
      query: () => ({
        url: `wallet`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Wallet'],
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
      invalidatesTags: ['Wallet'],
    }),

    addBeneficiary: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/create/beneficiary`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Wallet'],
    }),

    updateBeneficiary: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/update/beneficiary`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Wallet'],
    }),
  }),
});

export const {
  useDepositToWalletMutation,
  useGetUserWalletQuery,
  useSendOTPMutation,
  useAddBeneficiaryMutation,
  useUpdateBeneficiaryMutation,
} = walletApi;
