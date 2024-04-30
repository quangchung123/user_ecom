import React from 'react';
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
import {InputField, InputFieldProps} from "@/components/Core/Field/InputField";
import useFormService from "@/hooks/useFormService";
import useApiService from "@/hooks/useApiService";
import storage from "@/services/firebase/storage";
import {generateRandomString} from "@/utils/help";

const UploadFile = (props: InputFieldProps) => {
    const {values} = useFormService();
    const {callApi} = useApiService();
    const image = values[props.name];
    const upload = async ({field, event}: any) => {
        let url = await storage.putFile(event.target.files[0], `image/${generateRandomString(20)}.png`);
        field.onChange(url);
    }
    return (
        <div className={props.className}>
            <InputField
                type="file"
                style={{display: 'none'}}
                callBack={upload}
                {...props}
            />
            <label htmlFor={props.name}
                   className="w-full h-[40px] flex justify-center rounded-md items-center text-xs border border-gray-300">
                <div className={"text-base  w-auto px-3"}>
                    {props?.label || props?.placeholder}
                    {(image !== 'loading' && image) && <i className="bi bi-check-lg text-secondary"></i>}
                </div>
            </label>
            <div className={"flex justify-center"}>
                {image && (
                    <ImagePlacerHolder value={values[props.name]} className={"w-2/3 min-h-[50px]"}/>
                )}
            </div>
        </div>
    );
};

export default UploadFile;
