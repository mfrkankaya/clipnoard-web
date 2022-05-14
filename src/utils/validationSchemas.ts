import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('email_required').email('email_invalid'),
  password: Yup.string()
    .required('password_required')
    .min(8, 'password_short')
    .max(64, 'password_long')
})

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().required('email_required').email('email_invalid'),
  password: Yup.string()
    .required('password_required')
    .min(8, 'password_short')
    .max(64, 'password_long'),
  passwordConfirm: Yup.string()
    .required('passwordConfirm_required')
    .oneOf([Yup.ref('password')], 'passwordConfirm_match')
})

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('email_required').email('email_invalid')
})
