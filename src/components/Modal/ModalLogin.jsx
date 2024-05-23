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
import {notify} from "../../utils/help";
const ModalLogin = ({isShowingLogin, hideLogin, showRegister}) => {
	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState(false);
	const [isGoogleLogin, setIsGoogleLogin] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schemaLogin)
	});
	const { data } = useGetListUserQuery();
	const handleSubmitLogin = (payload) => {
		let foundUser;
		if (isGoogleLogin) {
			foundUser = data?.find((item) => item.email === payload.email);
		} else {
			foundUser = data?.find((item) => item.email === payload.email && item.password === payload.password);
		}
		if (foundUser) {
			dispatch(setUser({ user: {...payload, customerId: foundUser._id, name: foundUser.name }}));
			notify("Đăng nhập thành công")
			hideLogin()
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
	const handleOpenRegister = () => {
		showRegister();
		hideLogin();
	}

	return (
		<MyModal
			isShowing={isShowingLogin}
			handleSubmit={handleSubmit}
			onSubmit={handleSubmitLogin}
			handleHideModal={hideLogin}
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
			<p className="flex items-center justify-center font-bold mt-2.5 cursor-pointer opacity-65" onClick={handleOpenRegister}>Đăng ký tài khoản</p>
			{loginError && <p className="text-red-500">Tên đăng nhập hoặc mật khẩu không đúng</p>}
		</MyModal>
	);
};

export default ModalLogin;