import React, { useEffect, useState } from 'react';
import { logoUser } from "../../assets/index"
import MyButton from "../../components/Elements/Button/MyButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTER_INIT } from "../../config/constant";
import { useDispatch, useSelector } from "react-redux";
import { useGetListItemCartQuery } from "../../services/cart";
import "bootstrap-icons/font/bootstrap-icons.css";
import MenuAction from "../../components/Elements/MenuActions/MenuAction";
import styles from "./Header.module.scss"
import useModal from "../../hooks/useModal";
import ModalLogin from "../../components/Modal/ModalLogin";
import ModalRegister from "../../components/Modal/ModalRegister";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;
	const {HOME, CART, LOGIN, REGISTER, ACCOUNT} = ROUTER_INIT;
	const [active, setActive] = useState(HOME);
	const user = useSelector((state) => state.userAccount.user.name);
	const customerId = useSelector(state => state.userAccount.user.customerId);
	const [dataListCart, setDataListCart] = useState(null);
	const { data } = useGetListItemCartQuery();
	const numberItem = dataListCart?.length === 0 ? null : dataListCart?.length;
	const {isShowing: isShowingLogin, toggle: toggleLogin } = useModal();
	const {isShowing: isShowingRegister, toggle: toggleRegister} = useModal();

	useEffect(() => {
		setActive(pathname);
	}, [pathname]);

	useEffect(() => {
		if (data) {
			setDataListCart(data.filter(dataItemCart => dataItemCart.customerId === customerId));
		}
	}, [data, customerId]);

	const handleNavigateAccount = () => {
		navigate(ACCOUNT)
	};
	const handleNavigateOrder = () => {
		navigate(ROUTER_INIT.ORDER)
	};

	const listActionAccount = [
		{
			key: 1,
			title: 'Tài khoản',
			handleRowAction: handleNavigateAccount,
		},
		{
			key: 1,
			title: 'Đơn mua',
			handleRowAction: handleNavigateOrder,
		},
		{
			key: 2,
			title: 'Đăng xuất',
		},
	];

	return (
		<div className={styles.header}>
			<nav className={styles.headerTop}>
				<div>
					<ul>
						<li>+255 768 356 890</li>
						<li>info@zpunet.com</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>
							<MyButton onClick={toggleLogin}>
									Đăng nhập
							</MyButton>
							<ModalLogin
								isShowingLogin={isShowingLogin}
								hideLogin={toggleLogin}
								showRegister={toggleRegister}
							/>
						</li>
						<li>
							<MyButton onClick={toggleRegister}>
								Đăng ký
							</MyButton>
							<ModalRegister
								isShowingRegister={isShowingRegister}
								hideRegister={toggleRegister}
								showLogin={toggleLogin}
							/>
						</li>
					</ul>
				</div>
			</nav>
			<div className={styles.headerBottom}>
				<div>
					<Link to={HOME}>
						<img src={logoUser} alt="logo" />
					</Link>
				</div>
				<nav>
					<ul className={styles.headerRight}>
						<li>
							<Link to={HOME}>
								<button className={`${styles.infoAccount} ${active === HOME ? 'text-primary p-2 rounded-lg bg-accent' : 'text-gray-500'}`}>
									<i className="bi bi-house-fill mr-2 text-lg not-italic"></i>
									Trang chủ
								</button>
							</Link>
						</li>
						<li>
							{user && (
								<MenuAction data={listActionAccount} title={user? user : "Tài khoản"} styleButton={`${styles.infoAccount} ${active === ACCOUNT ? 'text-primary p-2 bg-accent' : 'text-gray-500'}`}>
									<i className="bi bi-person-fill not-italic mr-2 text-lg"></i>
								</MenuAction>
							)}
						</li>
						<li className={`${styles.infoCart}  ${active === CART ? 'text-primary p-3 bg-accent' : 'text-gray-500'}`}>
							<Link to={CART}>
								<MyButton>
									<i className="bi bi-cart-check-fill"></i>
									{numberItem && (
										<span>
											{numberItem}
										</span>
									)}
								</MyButton>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Header;
