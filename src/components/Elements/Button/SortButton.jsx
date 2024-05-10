import React from 'react';

const SortButton = ({label, onClick, active}) => {
	return (
		<button
			onClick={onClick}
			className={`px-4 py-2 border rounded-lg ${active ? 'border-primary text-primary' : ''}`}
		>
			{label}
		</button>
	);
};

export default SortButton;