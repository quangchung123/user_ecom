import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_CART} from "../config/api/endpoint";

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: customBaseQuery,
	tagTypes: ['cart'],
	endpoints: (builder) => ({
		getListItemCart: builder.query({
			query(body) {
				return {
					url: `${END_POINT_CART}/cart`,
					method: 'GET',
					body
				}
			},
			providesTags: ['cart']
		}),
		createNewItemToCart: builder.mutation({
			query(body) {
				return {
					url: `${END_POINT_CART}/cart`,
					method: 'POST',
					body
				}
			},
			invalidatesTags: ['cart']
		}),
		deleteItemToCart: builder.mutation({
			query(id) {
				return {
					url: `${END_POINT_CART}/cart/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['cart']
		}),
	})
})

export const {
	useCreateNewItemToCartMutation,
	useGetListItemCartQuery,
	useDeleteItemToCartMutation
} = cartApi