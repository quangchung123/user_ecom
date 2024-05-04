import React from 'react';
import CommentInput from "./CommentInput";
import ImportComment from "./ImportComment";

const Comment = ({productId}) => {
	console.log(productId)
	return (
		<div className={"overflow-auto ml-5 box-border py-12"}>
			<CommentInput productId={productId}/>
			<ImportComment productId={productId}/>
		</div>
	);
};

export default Comment;