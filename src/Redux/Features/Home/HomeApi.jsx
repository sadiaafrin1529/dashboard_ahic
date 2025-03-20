import { baseApi } from "../../api/baseApi";

const HomeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createHome: builder.mutation({
            query: (data) => ({
                url: "/home/create-home",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["home"]
        }),

        getAllHome: builder.query({
            query: () => ({
                url: "/home/home",
                method:"GET"
            }),
            providesTags:["home"]

        }),
        deleteHome:builder.query({
            query:(id)=>({
                url:``
            })
        })
    })
})

export const { useCreateHomeMutation,useGetAllHomeQuery } = HomeApi;