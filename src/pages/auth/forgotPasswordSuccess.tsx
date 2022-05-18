import { Box, Container, Typography } from '@mui/material'
import Head from 'next/head'

const ForgotPasswordSuccessPage = () => {
  return (
    <Box pt={10}>
      <Head>
        <title>Clipnoard | Done!</title>
      </Head>
      <Container maxWidth="xs">
        <Box mb={4} textAlign="center">
          <Typography variant="h5">DONE!</Typography>
          <Typography variant="body2" color="primary">
            An email has been sent to you to reset your password.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default ForgotPasswordSuccessPage
