import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_PRODUCT_SELECTED} from "../config/api/endpoint";

const productSelectedApi = createApi({
	reducerPath: 'productSelectedApi',
	baseQuery: customBaseQuery,
	tagTypes: ['productSelected'],
	endpoints: (builder) => ({
		createProductSelected: builder.mutation({
			query(body) {
				return {
					url: `${END_POINT_PRODUCT_SELECTED}/productSelected`,
					method: 'POST',
					body
				}
			},
			invalidatesTags: ['productSelected']
		}),
		getListProductSelected: builder.query({
			query(id) {
				return {
					url: `${END_POINT_PRODUCT_SELECTED}/productSelected/${id}`,
					method: 'GET',
				}
			},
			providesTags: ['productSelected']
		}),

	})
})

export const {useCreateProductSelectedMutation, useGetListProductSelectedQuery} = productSelectedApi;

export default productSelectedApi
