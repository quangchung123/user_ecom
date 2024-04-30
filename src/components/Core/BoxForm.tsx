import React, {FC, PropsWithChildren} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
type IBoxFormProps<T> = {
    schema?: any,
    defaultValue?: any
}
const BoxForm: FC<PropsWithChildren<IBoxFormProps<any>>> = ({children, schema =yup.object().shape({}), defaultValue = {}}) => {
    const methods = useForm<any>({
        defaultValues: defaultValue,
        resolver: yupResolver(schema)
    });

    return (
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )
}

export default BoxForm;
