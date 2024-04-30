import React from 'react';

const IconActions = ({listIconButton, value}) => {
		return (
				<div>
						{listIconButton.map((item, index) => (
								<button key={index} onClick={() => item.handleRowAction(value._id)}>
										<img src={item.src} alt={item.alt} />
								</button>
						))}
				</div>
		);
};

export default IconActions;