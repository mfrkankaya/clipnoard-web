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
import { signInAsync } from 'services'
import { LoginSchema, getLoginError } from 'utils'

const LoginPage = () => {
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
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServiceError('')

      try {
        await signInAsync(values.email, values.password)
        router.push('/')
      } catch (error) {
        const errorMessage = getLoginError(error)
        setServiceError(errorMessage)
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <Box pt={10}>
      <Container maxWidth="xs">
        <Box mb={4} textAlign="center">
          <Typography variant="h5">LOGIN</Typography>
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

            <Box width="100%" display="flex" justifyContent="flex-end">
              <NextLink href="/auth/forgotPassword" passHref>
                <Link underline="hover" variant="body2">
                  Forgot password?
                </Link>
              </NextLink>
            </Box>

            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              Login
            </Button>

            <Box textAlign="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <NextLink href="/auth/register" passHref>
                  <Link underline="hover">Register now.</Link>
                </NextLink>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default LoginPage
