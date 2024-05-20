import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Content = ({children}) => {
	return (
		<div>
			<div className="fixed top-0 z-10 w-full shadow-lg">
				<Header />
			</div>
			<div className="bg-content min-h-screen mt-32">
				{children}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Content;