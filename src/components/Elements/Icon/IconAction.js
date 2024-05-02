import React from 'react';

const IconActions = ({listIconButton, value}) => {
		return (
				<div>
						{listIconButton.map((item, index) => (
								<button key={index} onClick={() => item.handleRowAction()}>
										<img src={item.src} alt={item.alt} />
								</button>
						))}
				</div>
		);
};

export default IconActions;