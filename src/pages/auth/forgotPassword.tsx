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
import { sendPasswordResetEmailAsync } from 'services'
import { ForgotPasswordSchema, getForgotPasswordError } from 'utils'

const ForgotPasswordPage = () => {
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
    initialValues: { email: '' },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServiceError('')

      try {
        await sendPasswordResetEmailAsync(values.email)
        router.push('/auth/forgotPasswordSuccess')
      } catch (error) {
        const errorMessage = getForgotPasswordError(error)
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
          <Typography variant="h5">FORGOT PASSWORD</Typography>
          <Typography variant="body2" color="text.secondary">
            We will send you an email to reset yout password.
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

            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              Send email
            </Button>

            <Box textAlign="center">
              <Typography variant="body2">
                Remember your password?{' '}
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

export default ForgotPasswordPage
