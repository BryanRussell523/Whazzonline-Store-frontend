import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl:  import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (items) => ({
        url: "/orders/checkout",
        method: "POST",
        body: { items },
      }),
    }),
  }),
});

export const { useCheckoutMutation } = orderApi;