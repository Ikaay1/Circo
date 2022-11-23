import { baseUrl } from "@constants/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "redux/app/store";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = store.getState()?.app?.userReducer.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Settings"],
  endpoints: (builder) => ({
    getPreference: builder.query<any, any>({
      query: () => ({
        url: `notifications-settings`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Settings"],
    }),

    updatePreference: builder.mutation<any, any>({
      query: (body) => ({
        url: `notifications-settings`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetPreferenceQuery, useUpdatePreferenceMutation } =
  settingsApi;
