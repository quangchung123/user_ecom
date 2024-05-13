import React, {useState} from 'react';
import FormField from "../Elements/Form/FormField";
import MyModal from "./MyModal";
import {useForm} from "react-hook-form";
import {GoogleLogin} from "@react-oauth/google";
import {zodResolver} from "@hookform/resolvers/zod";
import {schemaLogin} from "../../config/validate";
import {useGetListUserQuery} from "../../services/user";
import {jwtDecode} from "jwt-decode";
import {setUser} from "../../store/action/userAccountSlice";
import {useDispatch} from "react-redux";
import styles from "../../features/auth/FormLogin.module.scss"
const ModalLogin = ({isShowingLogin, showLogin, setOpenModalRegister, isCreating}) => {
	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState(false);
	const [isGoogleLogin, setIsGoogleLogin] = useState(true);

	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schemaLogin)
	});
	const { data } = useGetListUserQuery();
	const handleSubmitLogin = (payload) => {
		let foundUser = null;
		if (isGoogleLogin) {
			foundUser = data.find((item) => item.email === payload.email);
		} else {
			foundUser = data.some((item) => item.email === payload.email && item.password === payload.password);
		}
		if (foundUser) {
			dispatch(setUser({ user: {...payload, customerId: foundUser._id }}));
			showLogin();
		} else {
			setLoginError(true);
		}
	};
	const handleGoogleLoginSuccess = async (credentialResponse) => {
		const decoded = await jwtDecode(credentialResponse?.credential);
		const payload = {
			name: decoded.name,
			email: decoded.email,
		}
		setIsGoogleLogin(true);
		await handleSubmitLogin(payload);
	}

	const handleRegister = () => {
		setOpenModalRegister(true)
		showLogin();
	}
	return (
		<MyModal
			isShowing={isShowingLogin}
			handleSubmit={handleSubmit}
			onSubmit={handleSubmitLogin}
			handleHideModal={showLogin}
			title={"Đăng nhập"}
			style={styles}
		>
			<h2 className="text-2xl font-bold">Login</h2>
			<FormField
				control={control}
				errors={errors}
				name={"email"}
				placeholder={"Nhập email"}
				label={"Email"}
			/>
			<FormField
				control={control}
				errors={errors}
				name={"password"}
				placeholder={"Nhập mật khẩu"}
				label={"Mật khẩu"}
			/>
			<div className="flex justify-center items-center">
				<GoogleLogin
					onSuccess={handleGoogleLoginSuccess}
					onError={() => {
						console.log('Login Failed');
					}}
				/>
			</div>
			<p className="cursor-pointer" onClick={handleRegister}>Đăng ký tài khoản</p>
			{loginError && <p className={styles.error}>Tên đăng nhập hoặc mật khẩu không đúng</p>}
		</MyModal>
	);
};

export default ModalLogin;