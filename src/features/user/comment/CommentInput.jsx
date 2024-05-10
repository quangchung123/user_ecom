import React, {useEffect, useMemo, useState} from 'react';
import { useDeleteCommentMutation, useGetListCommentQuery, useUpdateCommentMutation } from "../../../services/comment";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {getCurrentDateTime, getDataOnPage} from "../../../utils/help";
import Pagination from "../../../components/Elements/Pagination/MyPagination";
import {CURRENT_PAGE, RECORD_INIT} from "../../../config/constant";

const CommentInput = ({ productId }) => {
	const { data } = useGetListCommentQuery();
	const customerId = useSelector((state) => state.userAccount.user.customerId);
	const ratingPoint = useSelector((state) => state.filterRating.rating);
	const user = useSelector((state) => state.userAccount.user.name);
	const [dataComment, setDataComment] = useState(data);
	const [updateComment] = useUpdateCommentMutation();
	const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
	const recordsPerPage = RECORD_INIT;
	const totalPage = Math.ceil(dataComment?.length / recordsPerPage);
	const dataListComment = useMemo(() => (getDataOnPage(currentPage, dataComment, recordsPerPage)), [currentPage, dataComment]);
	const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);
	useEffect(() => {
		if(ratingPoint === 0) {
			setDataComment(data?.filter((dataComment) => dataComment.product_Id === productId));
		} else {
			const dataFilter = data?.filter((dataComment) => dataComment.product_Id === productId);
			const dataFilterByRating = dataFilter?.filter((dataCommentByRating) => dataCommentByRating.rating === ratingPoint);
			setDataComment(dataFilterByRating)
		}
	}, [productId, data, ratingPoint]);
	const [deleteComment] = useDeleteCommentMutation();
	const [editIndex, setEditIndex] = useState(-1);
	const [editRating, setEditRating] = useState(0);
	const {
		setValue,
		register,
		getValues,
		formState: { errors }
	} = useForm();

	const handleEditComment = async (index, isEdit, comment) => {
		if (isEdit) {
			setValue("editComment", comment.comment.comment);
			setEditRating(comment.rating);
			setEditIndex(index);
		}
		else {
			await updateComment({
				_id: comment._id,
				product_Id: productId,
				name: user,
				rating: editRating,
				customerId: customerId,
				date: getCurrentDateTime(),
				comment: {
					comment: getValues("editComment")
				}
			})
			setEditIndex(-1);
		}
	};
	const handleDeleteComment = async (comment) => {
		await deleteComment({
			_id: comment._id
		})
	}
	const handleChangeRating = (newRating) => {
		if (editIndex !== -1) {
			setEditRating(newRating);
		}
	};
	const renderStars = (rating, isEdit) => {
		const currentRating = isEdit ? editRating : rating;
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<i
					key={i}
					className={`bi bi-star-fill ${currentRating >= i ? 'text-yellow-500' : 'text-gray-400'} text-sm`}
					onClick={() => handleChangeRating(i)}
				>
				</i>
			)
		}
		return stars;
	}
	return (
		<div className="pb-4">
			{dataListComment?.map((comment, index) => (
				<div className="mt-4 flex w-full border-b pb-4" key={index}>
					<i className="bi bi-person-circle text-3xl mr-3 opacity-75 text-icon"></i>
					<div className="rounded-lg flex-1">
						<div className="flex flex-col">
							<span className="text-sm">{comment.name}</span>
							<div className="flex">
								{renderStars(comment.rating, editIndex === index)}
							</div>
							<p className="text-sm opacity-75">{comment.date}</p>
							<div className="mt-2">
									{editIndex === index ? (
										<textarea
											className={`${editIndex === index ? 'border border-primary rounded-lg w-full' : 'border-none'} focus:outline-none px-2`}
											{...register("editComment")}
										/>
									) : (
										<p>
											{comment.comment?.comment}
										</p>
									)}
								</div>
							{comment.customerId === customerId && (
								<div className="flex justify-end space-x-1.5">
									<button
										onClick={() => handleEditComment(index, editIndex !== index, comment)}
										className="px-1 rounded-full hover:bg-accent hover:text-primary text-lg"
									>
										{editIndex === index ? <i className="bi bi-floppy"></i> :
											<i className="bi bi-pencil-square"></i>}
									</button>
									<button
										onClick={() => handleDeleteComment(comment)}
										className="px-1 rounded-full hover:bg-accent hover:text-second"
									>
										<i className="bi bi-trash"></i>
									</button>
								</div>
								)}
							</div>
						</div>
				</div>
			))}
			{dataListComment?.length > 0 && (
				<Pagination
					setCurrentPage={setCurrentPage}
					pageNumbers={pageNumbers}
					currentPage={currentPage}
					totalPage={totalPage}
				/>
			)}
		</div>
	);
};

export default CommentInput;
