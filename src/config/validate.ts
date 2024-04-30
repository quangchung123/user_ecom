import * as yup from "yup";

export const schemaLogin = yup.object().shape({
    phone_number: yup
        .string()
        .required("Trường này là bắt buộc"),
    password: yup
        .string()
        .required("Trường này là bắt buộc"),
});

export const basicForm = yup.object().shape({});

