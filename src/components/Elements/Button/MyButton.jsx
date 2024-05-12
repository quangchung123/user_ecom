import React from 'react';
const MyButton = ({children,onClick, styleModify, onSubmit, disabled, type="submit"}) => {
		return (
				<button onClick={onClick} type={type} className={styleModify} disabled={disabled}>
						{children}
				</button>
		);
};

export default MyButton;