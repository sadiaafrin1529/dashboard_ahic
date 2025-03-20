import { baseApi } from "../../api/baseApi";


const CategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: "/category/create-category",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["category"]
        }),

        getAllCategory: builder.query({
            query: () => ({ 
                url: "/category",
                method: "GET",

            }),
            providesTags: ["category"]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["category"]
        })
    })
})
export const { useCreateCategoryMutation, useGetAllCategoryQuery ,useDeleteCategoryMutation} = CategoryApi