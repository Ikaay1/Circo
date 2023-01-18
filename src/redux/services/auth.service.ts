import { baseUrl } from '@constants/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // pre signup
    preSignup: builder.mutation<any, any>({
      query: (body) => ({
        url: `pre-signup`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),

    socialPreSignup: builder.mutation<any, any>({
      query: (body) => ({
        url: `social-pre-signup`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // signup
    signup: builder.mutation<any, any>({
      query: (body) => ({
        url: `signup`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),

    socialSignup: builder.mutation<any, any>({
      query: (body) => ({
        url: `social-signup`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),

    verifyEmail: builder.mutation<any, any>({
      query: (body) => ({
        url: `forgot-password`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),

    verifyLinkCode: builder.mutation<any, any>({
      query: (body) => ({
        url: `verify-forgot-password-link`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),

    changePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: `change-password`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  usePreSignupMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useVerifyLinkCodeMutation,
  useChangePasswordMutation,
  useSocialSignupMutation,
  useSocialPreSignupMutation,
} = authApi;
