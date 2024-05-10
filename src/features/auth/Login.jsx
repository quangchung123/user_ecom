import React, { useState } from 'react';
import styles from './FormLogin.module.scss';
import { useForm } from "react-hook-form";
import InputField from "../../components/Elements/Input/InputField";
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaLogin } from "../../config/validate";
import { useGetListUserQuery } from "../../services/user";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/action/userAccountSlice";
import { ROUTER_INIT } from "../../config/constant";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import MainLayout from "../../container/user/MainLayout";

const Login = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const handleRegister = () => {
        navigate(ROUTER_INIT.REGISTER);
    }
    const handleSubmitLogin = (payload) => {
        let isExists = false;
        let foundUser = null;
        if (isGoogleLogin) {
            foundUser = data.find((item) => item.email === payload.email);
        } else {
            foundUser = data.some((item) => item.email === payload.email && item.password === payload.password);
        }
        if (foundUser) {
            dispatch(setUser({ user: {...payload, customerId: foundUser._id }}));
            navigate(ROUTER_INIT.HOME);
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
        await handleSubmitLogin(payload)
    }

    return (
      <MainLayout>
          <div className={styles.container}>
              <Link to={ROUTER_INIT.HOME}>
                  Home
              </Link>
              <form onSubmit={handleSubmit(handleSubmitLogin)}>
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
                  <p className={styles.formItem} onClick={handleRegister}>Create Account?</p>
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                  />
                  {loginError && <p className={styles.error}>Tên đăng nhập hoặc mật khẩu không đúng</p>}
                  <div className={styles.formItem}>
                      <button type="submit">Đăng nhập</button>
                  </div>
              </form>
              {children}
          </div>
      </MainLayout>
    );
};

export default Login;
