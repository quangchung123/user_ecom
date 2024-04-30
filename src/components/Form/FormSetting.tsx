import React, {useEffect} from 'react';
import {InputField} from "@/components/Core/Field/InputField";
import Button from "@/components/UI/Button";
import useFormService from "@/hooks/useFormService";
import styles from '@/components/Form/Form.module.scss';
import {IPayloadPost, IReactWithChildren} from "@/types";
import {useRouter} from "next/router";
import db from "@/services/firebase/db";
import UploadFile from "@/components/Core/Field/UploadFile";

const FormSetting: IReactWithChildren<any> = () => {
    const {handleSubmit, values, reset, formState: {isSubmitting, errors}, setError} = useFormService();
    const router = useRouter();
    const handlePostSubmit: any = async (payload: IPayloadPost) => {
        await db.send(`contacts`, payload);
    };

    const getItem = async () => {
        const data = await db.listenOnce(`contacts`, 'value');
        if (data) {
            reset(data);
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <div className={`${styles.form} w-full flex flex-col justify-center`}>
            <form onSubmit={handleSubmit(handlePostSubmit)}>
                <h3>Đầu trang</h3>
                <div className={"grid grid-cols-2 gap-5"}>
                    <UploadFile
                        name="logo"
                        label={"Chọn logo"}
                    />
                    <UploadFile
                        name="banner"
                        label={"Chọn Banner"}
                    />
                    <InputField
                        name="phone"
                        label={"Nhập SĐT Hotline"}
                    />
                    <InputField
                        name="pages.0.router"
                        label={"Nhập địa chỉ FB"}
                    />
                    <InputField
                        name="pages.1.router"
                        label={"Nhập địa chỉ Tiktok"}
                    />
                </div>
                <h3 className={"my-3"}>Cuối trang</h3>
                <div className={"grid grid-cols-2 gap-5"}>
                    <InputField
                        name="detail.0.name"
                        label={"Nhập địa chỉ shop"}
                    />
                    <InputField
                        name="detail.0.router"
                        label={"Nhập địa chỉ GG Map"}
                    />
                    <InputField
                        name="detail.1.name"
                        label={"Nhập SĐT Hotline"}
                    />
                    <InputField
                        name="detail.2.name"
                        label={"Nhập thông tin làm việc"}
                    />
                </div>
                <Button
                    isLoading={isSubmitting || values["is_uploading"]}
                    type="submit"
                    className={`${styles["btn"]} my-4`}
                >
                    Cập nhật
                </Button>
            </form>
        </div>
    );
};

export default FormSetting;
