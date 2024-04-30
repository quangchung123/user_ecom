import React from 'react';
import {useNavigate} from "react-router-dom";

const ButtonSidebar = ({children, route, ...props}) => {
		const navigate = useNavigate();
		const clickNavigate = () => {
				navigate(route)
		}
		return (
				<li onClick={clickNavigate} {...props}>
						{children}
				</li>
		);
};

export default ButtonSidebar;