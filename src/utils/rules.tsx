import * as yup from 'yup'
export const schema = yup.object({
  email: yup
    .string()
    .required('Nhập email là bắt buộc ')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài email phải từ 5-160 kí tự')
    .max(160, 'Độ dài email phải từ 5-160 kí tự'),
  password: yup
    .string()
    .required('Nhập mật khẩu là bắt buộc')
    .min(6, 'Độ dài mật khẩu phải từ 6-160 kí tự')
    .max(160, 'Độ dài mật khẩu phải từ 6-160 kí tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc')
    .min(6, 'Độ dài mật khẩu phải từ 6-160 kí tự')
    .max(160, 'Độ dài mật khẩu phải từ 6-160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})
export type Schema = yup.InferType<typeof schema>
