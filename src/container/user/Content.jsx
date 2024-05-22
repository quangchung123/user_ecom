import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {useSelector} from "react-redux";

const Content = ({children}) => {
	const user = useSelector((state) => state.userAccount.user.name);
	return (
		<div>
			<div className="fixed top-0 z-10 w-full shadow-lg">
				<Header />
			</div>
			<div className={`bg-content min-h-screen box-border ${user? 'pt-20' : 'pt-32'}`}>
				{children}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Content;