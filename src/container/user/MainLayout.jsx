import React from 'react';
import Content from "./Content";

const MainLayout = ({children}) => {
	return (
		<div>
			<Content>
				{children}
			</Content>
		</div>
	);
};

export default MainLayout;