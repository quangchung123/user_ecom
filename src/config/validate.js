import * as zod from "zod";
export const schemaLogin = zod.object({
    email: zod.string().nonempty().email('Email không hợp lệ').trim(),
    password: zod.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').trim(),
});

export const schemaRegister = zod.object({
    name: zod.string().min(3, 'Tên phải có ít nhất 3 ký tự').trim(),
    email: zod.string().nonempty().email('Email không hợp lệ').trim(),
    password: zod.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').trim(),
});