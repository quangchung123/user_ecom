import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_PRODUCT} from "../config/api/endpoint";

export const productApi = createApi({
		reducerPath: "productApi",
		baseQuery: customBaseQuery,
		tagTypes: ['product'],
		endpoints: (builder) => ({
				getListProduct: builder.query({
						query(body) {
								return {
										url: `${END_POINT_PRODUCT}/product`,
										method: 'GET',
										body
								}
						},
						providesTags: ['product']
				}),
				createNewProduct: builder.mutation({
						query(body) {
								return {
										url: `${END_POINT_PRODUCT}/product`,
										method: 'POST',
										body
								}
						},
						invalidatesTags: ['product']
				}),
				deleteProduct: builder.mutation({
						query(id) {
								return {
										url: `${END_POINT_PRODUCT}/product/${id}`,
										method: 'DELETE',
								}
						},
						invalidatesTags: ['product']
				}),
				updateProduct: builder.mutation({
						query(body) {
								const {_id, ...payload} = body
								return {
										url: `${END_POINT_PRODUCT}/product/${_id}`,
										method: 'PUT',
										body: payload
								}
						},
						invalidatesTags: ['product']
				}),
				getDetailProduct: builder.query({
						query(id) {
								return {
										url: `${END_POINT_PRODUCT}/product/${id}`,
										method: 'GET'
								}
						}
				})
		})
});

export const {
		useGetListProductQuery,
		useCreateNewProductMutation,
		useDeleteProductMutation,
		useUpdateProductMutation,
		useGetDetailProductQuery
} = productApi;