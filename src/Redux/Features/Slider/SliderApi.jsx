import { baseApi } from "../../api/baseApi";

export const SliderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSlider: builder.mutation({
            query: (data) => ({
                url: "/slider/create-slider",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["slider"],
        }),

        getAllSlider:builder.query({
            query: () => ({
                url: "/slider",
                method: "GET",
              }),
              providesTags: ["slider"],
        }),
        deleteSlider: builder.mutation({
            query: (id) => ({
              url: `/slider/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["slider"], // Ensure deleted data is removed from cache
          }),
    }),
});

export const { useCreateSliderMutation,useGetAllSliderQuery,useDeleteSliderMutation  } = SliderApi; // Correct way to export
