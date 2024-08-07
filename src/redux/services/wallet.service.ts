import { store } from "redux/app/store";

import { baseUrl } from "@constants/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = store.getState()?.app?.userReducer?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Wallet"],
  endpoints: (builder) => ({
    depositToWallet: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/deposit`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Wallet"],
    }),

    getUserWallet: builder.query<any, any>({
      query: (fiter) => ({
        url: `wallet?${fiter}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Wallet"],
    }),

    addBeneficiary: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/create/beneficiary`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Wallet"],
    }),

    giftUser: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/transfer/gift`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Wallet"],
    }),

    confirmDeposit: builder.mutation<any, any>({
      query: (body) => ({
        url: `flutterwave/confirm`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Wallet"],
    }),
  }),
});

export const {
  useDepositToWalletMutation,
  useGetUserWalletQuery,
  useAddBeneficiaryMutation,
  useGiftUserMutation,
  useConfirmDepositMutation,
} = walletApi;
