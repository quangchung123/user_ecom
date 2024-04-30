import React, { useState } from 'react';
import styles from './FormLogin.module.scss';
import { useForm } from "react-hook-form";
import InputField from "../../components/Elements/Input/InputField";
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaLogin } from "../../config/validate";
import { useGetListUserQuery } from "../../services/user";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/action/userAccountSlice";
import {ROUTER_INIT} from "../../config/constant";

const Login = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    });
    const { data } = useGetListUserQuery();
    const onSubmit = (payload) => {
        const dataPayload = {
            ...payload,
            title: 'Admin'
        }
        const isExists = data.find((item) => item.username === dataPayload.username && item.password === dataPayload.password && item.title === dataPayload.title);
        if (isExists) {
            dispatch(setUser({user: payload}))
            navigate(ROUTER_INIT.ADMIN);
        } else {
            setLoginError(true);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formItem}>
                    <p>Login</p>
                </div>
                <div>
                    <label>Tên đăng nhập</label>
                    <InputField
                        type="text"
                        placeholder="Tên đăng nhập"
                        name="username"
                        control={control}
                        errors={errors}
                        inputType={"text"}
                    />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <InputField
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        control={control}
                        errors={errors}
                        inputType={"text"}
                    />
                </div>
                {loginError && <p className={styles.error}>Tên đăng nhập hoặc mật khẩu không đúng</p>}
                <div className={styles.formItem}>
                    <button type="submit">Đăng nhập</button>
                </div>
            </form>
            {children}
        </div>
    );
};

export default Login;
