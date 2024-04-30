import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_USER} from "../config/api/endpoint";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customBaseQuery,
    tagTypes: ['user'],
    endpoints: (builder) => ({
        getListUser: builder.query({
            query(body) {
                return {
                    url: `${END_POINT_USER}/user`,
                    method: "GET",
                    body
                }
            },
            providesTags: ['user']
        }),
        createNewUser: builder.mutation({
            query(body) {
                return {
                    url: `${END_POINT_USER}/user`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['user']
        }),
        deleteUser: builder.mutation({
            query(id) {
                return {
                    url: `${END_POINT_USER}/user/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['user']
        }),
        updateUser: builder.mutation({
            query(body) {
                const {_id, ...payload} = body
                return {
                    url: `${END_POINT_USER}/user/${_id}`,
                    method: 'PUT',
                    body: payload
                }
            },
            invalidatesTags: ['user']
        })
    })
});
export const {
    useGetListUserQuery,
    useCreateNewUserMutation,
    useLazyGetListUserQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} = userApi;