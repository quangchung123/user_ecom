import React from 'react';
import Content from "./Content";
import {useSelector} from "react-redux";

const MainLayout = ({children}) => {
		const theme = useSelector((state) => state.themeMode.theme);
		return (
				<div className={theme && "dark"}>
						<Content>
								{children}
						</Content>
				</div>
		);
};

export default MainLayout;