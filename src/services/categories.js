import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_CATEGORIES} from "../config/api/endpoint";

export const categoriesApi = createApi({
		reducerPath: "categoriesApi",
		baseQuery: customBaseQuery,
		tagTypes: ['categories'],
		endpoints: (builder) => ({
				getListCategories: builder.query({
						query(body) {
								return {
										url: `${END_POINT_CATEGORIES}/categories`,
										method: 'GET',
										body
								}
						},
						providesTags: ['categories']
				}),
				createNewCategories: builder.mutation({
						query(body) {
								return {
										url: `${END_POINT_CATEGORIES}/categories`,
										method: 'POST',
										body
								}
						},
						invalidatesTags: ['categories']
				}),
				deleteCategories: builder.mutation({
						query(id) {
								return {
										url: `${END_POINT_CATEGORIES}/categories/${id}`,
										method: 'DELETE',
								}
						},
						invalidatesTags: ['categories']
				}),
				updateCategories: builder.mutation({
						query(body) {
								const {_id, ...payload} = body
								return {
										url: `${END_POINT_CATEGORIES}/categories/${_id}`,
										method: 'PUT',
										body: payload
								}
						},
						invalidatesTags: ['categories']
				})
		})
});

export const {
		useGetListCategoriesQuery,
		useCreateNewCategoriesMutation,
		useDeleteCategoriesMutation,
		useUpdateCategoriesMutation
} = categoriesApi;