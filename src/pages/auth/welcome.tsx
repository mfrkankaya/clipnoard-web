import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import Link from 'next/link'

const WelcomePage = () => {
  return (
    <Box pt={10}>
      <Container maxWidth="xs">
        <Box mb={4} textAlign="center">
          <Typography variant="h5">WELCOME TO</Typography>
          <Typography variant="h4" color="primary">
            CLIPNOARD
          </Typography>
        </Box>

        <Button size="large" variant="contained" color="primary" fullWidth>
          Continue with Google
        </Button>

        <Box my={4}>
          <Divider>OR</Divider>
        </Box>

        <Stack spacing={2}>
          <Link href="/auth/login" passHref>
            <Button size="large" variant="outlined" color="primary" fullWidth>
              Login with Email
            </Button>
          </Link>

          <Link href="/auth/register" passHref>
            <Button size="large" variant="outlined" color="primary" fullWidth>
              Register with Email
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}

export default WelcomePage
