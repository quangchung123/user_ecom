import React from 'react';
import CommentInput from "./CommentInput";
import ImportComment from "./ImportComment";

const Comment = ({productId}) => {
	return (
		<div className={"overflow-auto box-border py-12"}>
			<CommentInput productId={productId}/>
			<ImportComment productId={productId}/>
		</div>
	);
};

export default Comment;