import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import NextLink from 'next/link'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  createUserAsync,
  sendEmailVerificationAsync,
  signUpAsync
} from 'services'
import { RegisterSchema, getRegisterError } from 'utils'
import Head from 'next/head'

const RegisterPage = () => {
  const [serviceError, setServiceError] = useState('')
  const router = useRouter()
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur
  } = useFormik({
    initialValues: { email: '', password: '', passwordConfirm: '' },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServiceError('')

      try {
        const { user } = await signUpAsync(values.email, values.password)
        await createUserAsync(user)
        await sendEmailVerificationAsync(user)
        router.push('/')
      } catch (error) {
        console.error(error)
        const errorMessage = getRegisterError(error)
        setServiceError(errorMessage)
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <Box pt={10}>
      <Head>
        <title>Clipnoard | Register</title>
      </Head>
      <Container maxWidth="xs">
        <Box mb={4} textAlign="center">
          <Typography variant="h5">REGISTER</Typography>
          <Typography variant="h4" color="primary">
            CLIPNOARD
          </Typography>
        </Box>

        {serviceError && (
          <Box mb={4}>
            <Alert severity="error">{serviceError}</Alert>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              required
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
              required
            />

            <TextField
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="Password Confirm"
              variant="outlined"
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
              helperText={touched.passwordConfirm && errors.passwordConfirm}
              fullWidth
              required
            />

            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              Register
            </Button>

            <Box textAlign="center">
              <Typography variant="body2">
                Already registered?{' '}
                <NextLink href="/auth/login" passHref>
                  <Link underline="hover">Login now.</Link>
                </NextLink>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default RegisterPage
