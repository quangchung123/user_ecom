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
import InputSearch from "../../components/Elements/Search/InputSearch";
import {setInputSearch} from "../../store/action/inputSearchSlice";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
	const [valueInput, setValueInput] = useState('');
	dispatch(setInputSearch({valueInput: valueInput}))

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
	const handleLogout = () => {
		localStorage.clear();
		window.location.reload();
	}

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
			handleRowAction: handleLogout,
		},
	];

	return (
		<div className={styles.header}>
			{!user && (
				<nav className={styles.headerTop}>
					<div>
						<ul>
							<li>Kết nối</li>
							<li>
								<a href="https://www.facebook.com/">
									<i className="bi bi-facebook"></i>
								</a>
							</li>
							<li>
								<a href="https://www.instagram.com/">
									<i className="bi bi-instagram"></i>
								</a>
							</li>
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
							<li className="border-l-[1px]"></li>
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
			)}
			<div className={styles.headerBottom}>
				<div>
					<Link to={HOME}>
						<img src={logoUser} alt="logo" />
					</Link>
				</div>
				<div className="w-1/3 mr-48">
					<InputSearch setValueInput={setValueInput} />
				</div>
				<nav>
					<ul className={styles.headerRight}>
						<li>
							<Link to={HOME}>
								<button className={`${styles.infoAccount} ${active === HOME ? 'text-primary p-2 rounded-lg bg-accent' : 'text-icon'}`}>
									<i className="bi bi-house-fill mr-2 text-lg not-italic"></i>
									Trang chủ
								</button>
							</Link>
						</li>
						<li>
							{user && (
								<MenuAction data={listActionAccount} title={user? user : "Tài khoản"} styleButton={`${styles.infoAccount} ${active === ACCOUNT ? 'text-primary p-2 bg-accent' : 'text-icon'}`}>
									<i className="bi bi-person-fill not-italic mr-2 text-lg"></i>
								</MenuAction>
							)}
						</li>
						<li>
							<Link to={CART}>
								<button className={`${styles.infoCart}  ${active === CART ? 'text-primary p-3 bg-accent' : 'text-icon'}`}>
									<i className="bi bi-cart-check-fill"></i>
									{numberItem && (
										<span>
											{numberItem}
										</span>
									)}
								</button>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Header;
