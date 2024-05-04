import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Content = ({children}) => {
	return (
		<div>
			<div>
				<Header />
			</div>
			<div className="">
				{children}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Content;