import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, "Password can't be shorter than 8 characters.")
    .max(64, "Password can't be longer than 64 characters.")
})

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, "Password can't be shorter than 8 characters.")
    .max(64, "Password can't be longer than 64 characters."),
  passwordConfirm: Yup.string()
    .required('Password confirmation is required.')
    .oneOf([Yup.ref('password')], 'Passwords must be same.')
})

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid')
})

export const CreateNoteSchema = Yup.object().shape({
  title: Yup.string().required('Note is required'),
  note: Yup.string().required('Note is required')
})
