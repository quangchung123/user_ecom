import React from 'react';
const MyButton = ({children,onClick, styleModify, link, onSubmit, type="submit"}) => {
		return (
				<button onClick={onClick} type={type} className={styleModify}>
						{children}
				</button>
		);
};

export default MyButton;