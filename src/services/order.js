import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_ORDER} from "../config/api/endpoint";

const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: customBaseQuery,
	tagTypes: ['order'],
	endpoints: (builder) => ({
		getListOrder: builder.query({
			query(body) {
				return {
					url: `${END_POINT_ORDER}/order`,
					method: 'GET',
					body
				}
			},
			providesTags: ['order']
		}),
		createNewOrder: builder.mutation({
			query: (body) => {
				return {
					url: `${END_POINT_ORDER}/order`,
					method: 'POST',
					body
				}
			},
			invalidatesTags: ['order']
		})
	})
})
export const {
	useCreateNewOrderMutation,
	useGetListOrderQuery
} = orderApi
export default orderApi;