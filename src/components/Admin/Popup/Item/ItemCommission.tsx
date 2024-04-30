import React, {useEffect} from 'react';
import {InputField} from "@/components/Core/Field/InputField";
import {useDispatch} from "react-redux";
import useFormService from "@/hooks/useFormService";
import {cloneObject, notify} from "@/utils/help";
import {adminApi} from "@/services/api/adminApi";
import styles from "@/components/Auth/WithLogin.module.css";
import formStyles from "@/components/Form/Form.module.scss";
import {useAppSelector} from "@/store";
import popupSlice from "@/services/storage/popupSlice";

const ItemCommission = () => {
    const dispatch = useDispatch();
    const resultData = useAppSelector((state) => state.popup.data);
    const {handleSubmit,setValue} = useFormService();

    useEffect(() => {
        setValue('name', resultData.dataRow.name);
        setValue('percent', resultData.dataRow.percent);
    }, []);
    const handlePopup = handleSubmit (async (payload : any) => {
        const dataPayload = {
            ...payload,
            percent: parseFloat(payload.percent),
            id: resultData.id
        }
        console.log(dataPayload)
        try {
            const response = await dispatch(adminApi.endpoints.updateInfoCommission.initiate(cloneObject(dataPayload)) as any);
            dispatch(popupSlice.actions.popup([]));
            notify("Cập nhật thành công");
        } catch (e){
            console.log(e);
        }
    })
    return (
        <div>
            <form className={`${styles.form_login_styles} ${formStyles.form}`} onSubmit={handlePopup}>
                <div className={styles.form_login_styles_input}>
                    <InputField name={"name"} placeholder="Tên cấp độ"/>
                </div>
                <div className={styles.form_login_styles_input} >
                    <InputField name={"percent"} placeholder="Hoa hồng" type="number" min="0" max="1" step="0.01"/>
                </div>
                <div className={styles.form_login_styles_button}>
                    <button type="submit">Cập nhật</button>
                </div>
            </form>
        </div>
    );
};

export default ItemCommission;