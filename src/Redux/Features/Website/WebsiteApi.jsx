import { baseApi } from "../../api/baseApi";

export const WebsiteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWebsite: builder.mutation({
      query: (data) => ({
        url: "/website/create-website",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["website"], // Ensure cache refresh
    }),

    getAllWebsite: builder.query({
      query: () => ({
        url: "/website",
        method: "GET",
      }),
      providesTags: ["website"], // Correct tag format
    }),

    deleteWebsite: builder.mutation({
      query: (id) => ({
        url: `/website/delete-website/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["website"], // Ensure deleted data is removed from cache
    }),
  }),
});

export const { 
  useCreateWebsiteMutation, 
  useGetAllWebsiteQuery, 
  useDeleteWebsiteMutation 
} = WebsiteApi;
