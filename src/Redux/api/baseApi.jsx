
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:9000/api",
  baseUrl: "https://goswiftlead.online/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    // console.log(token)

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery,
    endpoints: () => ({}),
});