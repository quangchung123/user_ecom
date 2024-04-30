import * as yup from "zod";
export const schemaLogin = yup.object({
    username: yup.string().nonempty('Tên đăng nhập không được để trống').trim(),
    password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').trim(),
});