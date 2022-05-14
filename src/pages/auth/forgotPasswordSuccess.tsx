import { Box, Container, Typography } from '@mui/material'

const ForgotPasswordSuccessPage = () => {
  return (
    <Box pt={10}>
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
