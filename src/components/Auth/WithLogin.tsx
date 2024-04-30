import React, {useEffect, useState} from "react";
import styles from "@/components/Auth/WithLogin.module.css";
import formStyles from "@/components/Form/Form.module.scss";
import {InputField} from "@/components/Core/Field/InputField";
import {useAppDispatch} from "@/store";
import useFormService from "@/hooks/useFormService";
import userApi from "@/services/api/userApi";
import {cloneObject, notify} from "@/utils/help";
import {IBodyResponseMutation} from "@/types";
import {useRouter} from 'next/router';

const WithLogin = () => {
    const [eyeIcon, setEyeIcon] = useState(false);
    const [passwordHide, setPasswordHide] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const handlePasswordHide = () => {
        setEyeIcon(!eyeIcon);
        setPasswordHide(!passwordHide);
    };

    const dispatch = useAppDispatch();

    const {handleSubmit} = useFormService();
    // handleSubmit Giúp lấy dữ liệu từ InputField
    const handleLogin = handleSubmit(async (payload: any) => {
        try {
            const response = await dispatch(userApi.endpoints.login.initiate(cloneObject(payload))) as IBodyResponseMutation;
            if (!response.hasOwnProperty("error")) {
                const {data, code, message, error} = response.data;
                // console.log("token", data.token);
                localStorage.setItem("token", data.access_token);
                notify(message);
                await  router.push({
                    pathname: '/admin/shop'
                })
                return;
            }
            throw response.error;
        } catch (error) {
            notify((error as Error).message);
        }
    });

    return (
        <div className={styles.form_container}>
            <div className={`${styles.form_login} less_xs:w-80` }>
                <form className={`${styles.form_login_styles} ${formStyles.form}`} onSubmit={handleLogin}>
                    <div>
                        <span className={styles.form_login_styles_header}>Login</span>
                    </div>
                    <div className={styles.form_login_styles_input}>
                        <InputField name={"phone_number"} placeholder="Phone Number"/>
                    </div>
                    <div className={styles.form_login_styles_input}>
                        <InputField
                            name={"password"}
                            placeholder="Password"
                            type={passwordHide ? "text" : "password"}
                        />
                        {eyeIcon ? (
                            <i
                                className="bi bi-eye-slash"
                                onClick={handlePasswordHide}
                            ></i>
                        ) : (
                            <i className="bi bi-eye" onClick={handlePasswordHide}></i>
                        )}
                    </div>
                    <div className={styles.form_login_styles_remember}>
                        <input type="checkbox" name="remember-me" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <div className={styles.form_login_styles_button}>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithLogin;
