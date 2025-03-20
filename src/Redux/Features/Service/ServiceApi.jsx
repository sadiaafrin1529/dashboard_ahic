import { baseApi } from "../../api/baseApi";

const ServiceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createService: builder.mutation({
            query: (data) => (
                {
                    url: "/service/create-service",
                    method: "POST",
                    body: data
                }),
            invalidatesTags: ["service"]
        }),

        getAllService: builder.query({
            query: () => ({
                url: "/service",
                method: "GET"
            }),
            providesTags: ["service"]
        }),

        deleteservice: builder.mutation({
            query: (id) => ({
                url: `/service/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["service"]
        })
    })
})
export const { useCreateServiceMutation, useGetAllServiceQuery,useDeleteserviceMutation } = ServiceApi