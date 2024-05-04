import React, { useState } from 'react';
import { useAddCommentMutation } from "../../../services/comment";
import InputField from "../../../components/Elements/Input/InputField";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {getCurrentDateTime} from "../../../utils/help";

const ImportComment = ({ productId }) => {
	const [addComment] = useAddCommentMutation();
	const user = useSelector((state) => state.userAccount.user.name);
	const email = useSelector((state) => state.userAccount.user.email);
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm();

	const handleAddComment = async (data) => {
		data.comment = data.comment.replace(/\s+/g, '');
		const payload = {
			product_Id: productId,
			comment: data,
			name: user,
			email: email,
			rating: rating,
			date: getCurrentDateTime()
		}
		try {
			await addComment(payload);
			reset({ comment: "" });
			setHover(null)
			setRating(null)
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className="border border-gray-300 p-4 rounded-lg">
			<form onSubmit={handleSubmit(handleAddComment)}>
				<div className="mb-4">
					{[...Array(5)].map((star, index) => {
						const currentRating = index + 1;
						return (
							<label>
								<input
									type="radio"
									name="rating"
									value={currentRating}
									onClick={() => setRating(currentRating)}
									className="hidden"
								/>
								<i
									className={`bi bi-star-fill ${currentRating <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'}`}
									onMouseEnter={() => setHover(currentRating)}
									onMouseLeave={() => setHover(null)}
								></i>
							</label>
						)
					})}
					<InputField
						control={control}
						errors={errors}
						name={"comment"}
						placeholder={"Nhập bình luận"}
						inputType={"textarea"}
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-secondary  px-4 py-2 mr-2 rounded-lg  hover:bg-emerald-600"
					>
						Gửi
					</button>
				</div>
			</form>
		</div>
	);
};

export default ImportComment;
