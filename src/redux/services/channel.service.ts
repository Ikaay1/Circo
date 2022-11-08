import { baseUrl } from "@constants/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    createChannel: builder.mutation<any, any>({
      query: (body) => ({
        url: `channel/create`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: body,
      }),
    }),
  }),
});

export const { useCreateChannelMutation } = channelApi;
