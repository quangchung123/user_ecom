import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_ORDER} from "../config/api/endpoint";

const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		createNewOrder: builder.mutation({
			query: (body) => {
				return {
					url: `${END_POINT_ORDER}/order`,
					method: 'POST',
					body
				}
			}
		})
	})
})
export const {useCreateNewOrderMutation} = orderApi
export default orderApi;