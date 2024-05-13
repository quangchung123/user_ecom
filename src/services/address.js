import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../lib/customBaseQuery";
import {END_POINT_ADDRESS, END_POINT_CATEGORIES} from "../config/api/endpoint";

export const addressApi = createApi({
	reducerPath: 'addressApi',
	baseQuery: customBaseQuery,
	tagTypes: ['address'],
	endpoints: (builder) => ({
		getAddress: builder.query({
			query(body) {
				return {
					url: `${END_POINT_ADDRESS}/address`,
					method: 'GET',
					body
				}
			},
			providesTags: ['address']
		}),
		createNewAddress: builder.mutation({
			query(body) {
				return {
					url: `${END_POINT_ADDRESS}/address`,
					method: 'POST',
					body
				}
			},
			invalidatesTags: ['address']
		}),
		updateAddress: builder.mutation({
			query(body) {
				const {_id, ...payload} = body
				return {
					url: `${END_POINT_ADDRESS}/address/${_id}`,
					method: 'PUT',
					body: payload
				}
			},
			invalidatesTags: ['address']
		}),
	})
})
export const { useCreateNewAddressMutation, useGetAddressQuery, useUpdateAddressMutation } = addressApi;
