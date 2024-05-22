import React, { useState } from 'react';
import FormField from "../Elements/Form/FormField";
import MyModal from "./MyModal";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import styles from "../../features/auth/FormLogin.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaRegister } from "../../config/validate";
import {useCreateNewUserMutation, useGetListUserQuery, useUpdateUserMutation} from "../../services/user";
import { jwtDecode } from "jwt-decode";

const ModalRegister = ({ isShowingRegister, hideRegister, showLogin }) => {
	const [loginError, setLoginError] = useState(false);
	const { data } = useGetListUserQuery();
	const [createNewUser] = useCreateNewUserMutation();
	const [updateUser] = useUpdateUserMutation();
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schemaRegister)
	});

	const handleCreateAccount = async (payload) => {
		const dataPayload = {
			...payload,
			title: 'Customer'
		}
		const isExists = data?.find((item) => item.email === payload.email);
		if (isExists) {
			setLoginError(true)
		} else {
			const response = await createNewUser(dataPayload);
			const payload = response.data;
			await updateUser({
				...payload,
				address_Id: payload._id
			})
			console.log("response", response)
			showLogin();
			hideRegister()
		}
	}

	const handleGoogleLoginSuccess = async (credentialResponse) => {
		const decoded = await jwtDecode(credentialResponse?.credential);
		const payload = {
			name: decoded.name,
			email: decoded.email,
		}
		await handleCreateAccount(payload)
	}

	return (
		<MyModal
			isShowing={isShowingRegister}
			handleSubmit={handleSubmit}
			onSubmit={handleCreateAccount}
			handleHideModal={hideRegister}
			title={'Đăng ký'}
		>
			<h2 className="text-2xl font-bold">Đăng ký</h2>
			<FormField
				control={control}
				errors={errors}
				name={"name"}
				placeholder={"Tên"}
				label={"Tên"}
			/>
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
			{loginError && <p className={styles.error}>Email đã tồn tại</p>}
			<GoogleLogin
				onSuccess={handleGoogleLoginSuccess}
				onError={() => {
					console.log('Login Failed');
				}}
			/>
			{loginError && <p className={styles.error}>Tên đăng nhập hoặc mật khẩu không đúng</p>}
		</MyModal>
	);
};

export default ModalRegister;
