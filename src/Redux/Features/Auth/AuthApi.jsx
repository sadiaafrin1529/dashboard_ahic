import { baseApi } from "../../api/baseApi";


export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: () => '/user/get-all-users',
      providesTags:['user']
    }),
    crateUsers: builder.mutation({
      query: (data) => ({
        url:"/user/create-user",
        method:"POST",
        body:data
      }),
      invalidatesTags:['user']
    }),
    loginUsers: builder.mutation({
      query: (data) => ({
        url:"/user/login",
        method:"POST",
        body:data
      }),
    }),
  }),
});

export const {useFetchAllUsersQuery,useCrateUsersMutation,useLoginUsersMutation} = UserApi;