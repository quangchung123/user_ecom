import React, {useEffect} from 'react';
import {InputField} from "@/components/Core/Field/InputField";
import Button from "@/components/UI/Button";
import useFormService from "@/hooks/useFormService";
import styles from '@/components/Form/Form.module.scss';
import UploadFile from "@/components/Core/Field/UploadFile";
import QuillEditor from "@/components/Core/Editor";
import db from "@/services/firebase/db";
import {convertToSlug, generateRandomString} from "@/utils/help";
import {IPayloadPost, IReactWithChildren} from "@/types";
import {useRouter} from "next/router";
import {ulrAdmin} from "@/config/constant";
import SelectCategory from "@/components/Admin/Select/SelectCategory";

const FormUpPost:IReactWithChildren<{type:string}> = ({type}) => {
    const {handleSubmit, values,reset, formState: {isSubmitting, errors}, setError} = useFormService();
    const router = useRouter();
    const handlePostSubmit: any = async (payload: IPayloadPost) => {
        const key =router.query.id ?router.query.id[0]:`${convertToSlug(payload.title)}-${generateRandomString(4)}`
        await db.send(`${type}/${key}`, {...payload,id:key});
        await router.back();
    };

    const getItem =async ()=>{
        if(!router.route.includes("create") && router.query.id){
            const data = await db.listenById(`${type}/${router.query.id}`,'id',"value");
            if(!data){
                router.push(ulrAdmin);
            }else{
                reset(data);
            }
        }
    };

    useEffect(()=>{
        getItem();
    },[router.query.id]);

    return (
        <div className={`${styles.form} w-full flex flex-col justify-center`}>
            <form onSubmit={handleSubmit(handlePostSubmit)}>
                <div className={"grid grid-cols-2 gap-5"}>
                    <UploadFile
                        name="image"
                        label={"Chọn ảnh bài viết"}
                        placeholder={"Chọn ảnh"}
                        className={"col-span-2"}
                    />
                    <SelectCategory/>
                    <InputField
                        name="title"
                        label={"Nhập tiêu đề"}
                        placeholder={"Nhập tiêu đề"}
                    />
                    <InputField
                        name="alt_image"
                        label={"Nhập từ khóa của ảnh"}
                        placeholder={"Nhập từ khóa của ảnh"}
                    />
                    <InputField
                        name="subContent"
                        label={"Nhập nội dung phụ"}
                        placeholder={"Nhập nội dung phụ"}
                    />
                    <QuillEditor
                        name="content"
                        className={"col-span-2"}
                        label={"Nhập nội dung chi tiết"}
                    />
                </div>

                <Button
                    isLoading={isSubmitting || values["is_uploading"]}
                    type="submit"
                    className={`${styles["btn"]} my-4`}
                >
                    Đăng bài
                </Button>
            </form>
        </div>
    );
};

export default FormUpPost;
