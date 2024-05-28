import {createApi} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "../lib/customBaseQuery";
import {END_POINT_PRODUCT} from "../config/api/endpoint";
import {sortProductsByName, sortProductsByPrice} from "../utils/help";
import {LABEL_SORT} from "../config/constant";

const {NAME_A_TO_Z, NAME_Z_TO_A, PRICE_MAX_TO_MIN, PRICE_MIN_TO_MAX} = LABEL_SORT;
export const productApi = createApi({
		reducerPath: "productApi",
		baseQuery: customBaseQuery,
		tagTypes: ['product'],
		endpoints: (builder) => ({
				getListProduct: builder.query({
						query(body) {
							console.log('body', body)
								return {
										url: `${END_POINT_PRODUCT}/product`,
										method: 'GET',
								}
						},
						transformResponse(baseQueryReturnValue, meta, arg) {
							return baseQueryReturnValue
							// if(arg.category === "All category") {
							// 	return baseQueryReturnValue
							// }
							// if (arg.value) {
							// 	return baseQueryReturnValue.filter(item => item.name.toLowerCase().includes(arg.value.toLowerCase()));
							// }
							// return baseQueryReturnValue.filter(item => item.categories === arg.category);
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