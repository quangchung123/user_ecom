import React from 'react';
import {logoUser} from "../../assets/index"
import MyButton from "../../components/Elements/Button/MyButton";
import {useNavigate} from "react-router-dom";
import {ROUTER_INIT} from "../../config/constant";
import {useSelector} from "react-redux";

const Header = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.userAccount.user.name);
	console.log(user)
	const handleLogin = () => {
		navigate(ROUTER_INIT.LOGIN);
	}
	return (
		<div>
			<nav className="h-10 bg-primary flex justify-between box-border px-28 items-center text-white">
				<div>
					<ul className="flex">
						<li>+255 768 356 890</li>
						<li>info@zpunet.com</li>
					</ul>
				</div>
				<div>
					<ul className="flex">
						<li>
							<MyButton onClick={handleLogin}>
								Login
							</MyButton>
						</li>
						<li>
							<MyButton>
								Register
							</MyButton>
						</li>
					</ul>
				</div>
			</nav>
			<div className="h-24 bg-white border-b border-gray-400 flex items-center justify-between box-border px-40">
				<div>
					<a href="/home" className="mr-3.5">
						<img src={logoUser} alt="logo" className="h-14 inline-block"/>
					</a>
				</div>
				<nav>
					<ul className="flex box-border">
						<li>
							<MyButton styleModify={"py-3"}>
								Home
							</MyButton>
						</li>
						<li>
							<MyButton styleModify={"py-3"}>
								<i className="bi bi-person-fill not-italic">{user}</i>
							</MyButton>
						</li>
						<li>
							<MyButton styleModify={"px-3.5 py-3 hover:bg-accent rounded-full hover:text-primary"}>
								<i className="bi bi-cart-check-fill"></i>
							</MyButton>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Header;