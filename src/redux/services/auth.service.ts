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
                body: body,
            }),
            invalidatesTags: ['Auth'],
        }),

        // signup
        signup: builder.mutation<any, any>({
            query: (body) => ({
                url: `login`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {useLoginMutation, usePreSignupMutation, useSignupMutation} =
    authApi;
