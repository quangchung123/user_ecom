import React, {useEffect, useState} from 'react';
import {logoUser} from "../../assets/index"
import MyButton from "../../components/Elements/Button/MyButton";
import {useNavigate} from "react-router-dom";
import {ROUTER_INIT} from "../../config/constant";
import {useDispatch, useSelector} from "react-redux";
import {useGetListItemCartQuery} from "../../services/cart";
import "bootstrap-icons/font/bootstrap-icons.css";
import {setCart} from "../../store/action/cartSlice";
import MenuAction from "../../components/Elements/MenuActions/MenuAction";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userAccount.user.name);
	const customerId = useSelector(state => state.userAccount.user.customerId);
	const [dataListCart, setDataListCart] = useState(null);
	const {data} = useGetListItemCartQuery();
	const notify = dataListCart?.length;

	useEffect(() => {
		if(data) {
			setDataListCart(data.filter(dataItemCart => dataItemCart.customerId === customerId));
		}
	}, [data]);
	const handleLogin = () => {
		navigate(ROUTER_INIT.LOGIN);
	}
	const handleNavigateCart = () => {
		navigate(ROUTER_INIT.CART)
	}
	const handleNavigateAccount = () => {
		navigate(ROUTER_INIT.ACCOUNT)
	}
	const listActionAccount = [
		{
			key: 1,
			title: 'Thông tin tài khoản',
			handleRowAction: handleNavigateAccount,
		},
		{
			key: 2,
			title: 'Đăng xuất',
		},
	];
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
							<MyButton>
								Home
							</MyButton>
						</li>
						<li>
							<MenuAction data={listActionAccount} title={user}>
								<i className="bi bi-person-fill not-italic"></i>
							</MenuAction>
						</li>
						<li>
							<MyButton styleModify={"px-3.5 hover:bg-accent rounded-full hover:text-primary relative"} onClick={handleNavigateCart}>
								<i className="bi bi-cart-check-fill"></i>
								{notify && (
									<span className="bg-red-500 rounded-full text-white w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs">
										{notify}
									</span>
								)}
							</MyButton>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Header;