import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_ADDRESS} from "../config/api/endpoint";

export const addressApi = createApi({
	reducerPath: 'addressApi',
	baseQuery: customBaseQuery,
	tagTypes: ['address'],
	endpoints: (builder) => ({
		createNewAddress: builder.mutation({
			query(body) {
				return {
					url: `${END_POINT_ADDRESS}/address`,
					method: 'PUT',
					body
				}
			}
		}),
		getAddress: builder.query({
			query(body) {
				return {
					url: `${END_POINT_ADDRESS}/address`,
					method: 'GET',
					body
				}
			}
		})
	})
})
export const {useCreateNewAddressMutation, useGetAddressQuery} = addressApi;
