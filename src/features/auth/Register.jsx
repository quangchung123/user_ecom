import React, {useEffect, useState} from 'react';
import styles from './FormLogin.module.scss';
import { useForm } from "react-hook-form";
import InputField from "../../components/Elements/Input/InputField";
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaLogin } from "../../config/validate";
import {useCreateNewUserMutation, useGetListUserQuery} from "../../services/user";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/action/userAccountSlice";
import {ROUTER_INIT} from "../../config/constant";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Register = ({children}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm();
	const { data } = useGetListUserQuery();
	const [createNewUser]  = useCreateNewUserMutation();
	const handleCrateAccount = async (payload) => {
		const dataPayload = {
			...payload,
			title: 'Customer'
		}
		const isExists = data.find((item) => item.email === payload.email);
		if(isExists) {
			setLoginError(true)
		} else {
			await createNewUser(dataPayload);
			navigate(ROUTER_INIT.USER)
		}
	};
	const handleGoogleLoginSuccess = async (credentialResponse) => {
		const decoded = await jwtDecode(credentialResponse?.credential);
		const payload = {
			name: decoded.name,
			email: decoded.email,
		}
		await handleCrateAccount(payload)
	}

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(handleCrateAccount)}>
				<div className={styles.formItem}>
					<p>Register</p>
				</div>
				<div>
					<label>Tên</label>
					<InputField
						type="text"
						placeholder="Name"
						name="name"
						control={control}
						errors={errors}
						inputType={"text"}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<InputField
						type="text"
						placeholder="Email"
						name="email"
						control={control}
						errors={errors}
						inputType={"text"}
					/>
				</div>
				<div>
					<label htmlFor="password">Mật khẩu</label>
					<InputField
						type="text"
						placeholder="Mật khẩu"
						name="password"
						control={control}
						errors={errors}
						inputType={"text"}
					/>
				</div>
				<GoogleLogin
					onSuccess={handleGoogleLoginSuccess}
					onError={() => {
						console.log('Login Failed');
					}}
				/>
				{loginError && <p className={styles.error}>Email đã tồn tại</p>}
				<div className={styles.formItem}>
					<button type="submit">Đăng ký</button>
				</div>
			</form>
			{children}
		</div>
	);
};

export default Register;
