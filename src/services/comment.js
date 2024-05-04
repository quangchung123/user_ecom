import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../lib/customBaseQuery";
import { END_POINT_COMMENT } from "../config/api/endpoint";

export const commentApi = createApi({
	reducerPath: "commentApi",
	baseQuery: customBaseQuery,
	tagTypes: ['comment'],
	endpoints: (builder) => ({
		addComment: builder.mutation({
			query: (body) => ({
				url: `${END_POINT_COMMENT}/comment`,
				method: 'POST',
				body
			}),
			invalidatesTags: ['comment']
		}),
		getListComment: builder.query({
			query: () => ({
				url: `${END_POINT_COMMENT}/comment`,
				method: 'GET'
			}),
			providesTags: ['comment']
		}),
		updateComment: builder.mutation({
			query: (body) => {
				const { _id, ...payload } = body;
				return {
					url: `${END_POINT_COMMENT}/comment/${_id}`,
					method: 'PUT',
					body: payload
				};
			},
			invalidatesTags: ['comment']
		}),
		deleteComment: builder.mutation({
			query: (body) => ({
				url: `${END_POINT_COMMENT}/comment/${body._id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['comment']
		})
	})
});

export const {
	useAddCommentMutation,
	useGetListCommentQuery,
	useUpdateCommentMutation,
	useDeleteCommentMutation
} = commentApi;
