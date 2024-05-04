import React, {useEffect, useState} from 'react';
import { useDeleteCommentMutation, useGetListCommentQuery, useUpdateCommentMutation } from "../../../services/comment";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {getCurrentDateTime} from "../../../utils/help";

const CommentInput = ({ productId }) => {
	const { data } = useGetListCommentQuery();
	const user = useSelector((state) => state.userAccount.user.name);
	const ratingPoint = useSelector((state) => state.filterRating.rating);
	const [dataComment, setDataComment] = useState(data);
	const [updateComment] = useUpdateCommentMutation();
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
	const email = useSelector((state) => state.userAccount.user.email);
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
				email: email,
				rating: editRating,
				name: user,
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
					className={`bi bi-star-fill ${currentRating >= i ? 'text-yellow-500' : 'text-gray-400'}`}
					onClick={() => handleChangeRating(i)}
				>
				</i>
			)
		}
		return stars;
	}
	return (
		<div>
			{dataComment?.map((comment, index) => (
				<div className="mt-4" key={index}>
					<div className="bg-gray-200 p-3 mb-2 rounded-lg">
						<div className="flex flex-col">
							<span className="text-blue-700 text-base">{comment.name === undefined ? "Tài khoản ẩn danh" : comment.name}</span>
							<div className="flex">
								{renderStars(comment.rating, editIndex === index)}
							</div>
							<p>{comment.date}</p>
							<hr className={"bg-white !h-[1px] border-white"} />
							<div>
								<div>
									{editIndex === index ? (
										<textarea
											{...register("editComment")}
										/>
									) : (
										<p>
											{comment.comment?.comment}
										</p>
									)}
								</div>
								{comment.email === email && (
									<div>
										<button onClick={() => handleEditComment(index, editIndex !== index, comment)}>
											{editIndex === index ? <i className="bi bi-floppy"></i> :
												<i className="bi bi-pencil-square"></i>}
										</button>
										<button onClick={() => handleDeleteComment(comment)}>
											<i className="bi bi-trash"></i>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default CommentInput;
