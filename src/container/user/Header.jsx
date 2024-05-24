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
import { setInputSearch } from "../../store/action/inputSearchSlice";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const { pathname } = location;
	const { HOME, CART, LOGIN, REGISTER, ACCOUNT , ORDER} = ROUTER_INIT;
	const [active, setActive] = useState(HOME);
	const user = useSelector((state) => state.userAccount.user.name);
	const customerId = useSelector(state => state.userAccount.user.customerId);
	const [dataListCart, setDataListCart] = useState(null);
	const { data } = useGetListItemCartQuery();
	const numberItem = dataListCart?.length === 0 ? null : dataListCart?.length;
	const { isShowing: isShowingLogin, toggle: toggleLogin } = useModal();
	const { isShowing: isShowingRegister, toggle: toggleRegister } = useModal();
	const [valueInput, setValueInput] = useState('');

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	dispatch(setInputSearch({ valueInput: valueInput }))
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

	useEffect(() => {
		setActive(pathname);
	}, [pathname]);

	useEffect(() => {
		if (data) {
			setDataListCart(data.filter(dataItemCart => dataItemCart.customerId === customerId));
		}
	}, [data, customerId]);

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	}

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
				<div className="flex items-center space-x-5">
					<Link to={HOME}>
						<img src={logoUser} alt="logo" />
					</Link>
					<div className="md:w-96 mr-0">
						<InputSearch setValueInput={setValueInput} />
					</div>
				</div>
				<nav className="flex">
					<ul className="hidden md:flex md:items-center">
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
								<MenuAction data={listActionAccount} title={user ? user : "Tài khoản"} styleButton={`${styles.infoAccount} ${active === ACCOUNT || active === ORDER? 'text-primary p-2 bg-accent rounded-lg' : 'text-icon'}`}>
									<i className="bi bi-person-fill not-italic mr-2 text-lg"></i>
								</MenuAction>
							)}
						</li>
					</ul>
					<div className="flex items-center">
						<div className="relative">
							<button className={`${styles.infoCart} ${active === CART ? 'text-primary bg-accent rounded-full' : 'text-icon'} p-3 `}>
								<Link to={CART}>
									<i className="bi bi-cart-check-fill">
										{numberItem && <span className="bg-red-500 rounded-full text-white w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs">{numberItem}</span>}
									</i>
								</Link>
							</button>
						</div>
						<button className="md:hidden p-2 rounded-lg hover:bg-accent hover:text-primary" onClick={handleMenuToggle}>
							<i className="bi bi-list text-lg"></i>
						</button>
					</div>
				</nav>
			</div>
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
					<div className="bg-white w-64 p-5">
						<button className="text-right mb-4" onClick={handleMenuToggle}>
							<i className="bi bi-x-lg"></i>
						</button>
						<ul>
							<li>
								<Link to={HOME} onClick={handleMenuToggle}>
									<button className={`${styles.infoAccount} ${active === HOME ? 'text-primary p-2 rounded-lg bg-accent' : 'text-icon'}`}>
										<i className="bi bi-house-fill mr-2 text-lg not-italic"></i>
										Trang chủ
									</button>
								</Link>
							</li>
							<li>
								{user && (
									<MenuAction data={listActionAccount} title={user ? user : "Tài khoản"} styleButton={`${styles.infoAccount} ${active === ACCOUNT ? 'text-primary p-2 bg-accent' : 'text-icon'}`}>
										<i className="bi bi-person-fill not-italic mr-2 text-lg"></i>
									</MenuAction>
								)}
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
