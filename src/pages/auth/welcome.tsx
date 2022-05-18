import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { getUserAsync, createUserAsync, signInWithGoogleAsync } from 'services'

const WelcomePage = () => {
  const router = useRouter()
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    const user = await signInWithGoogleAsync()
    if (user) {
      const userData = await getUserAsync(user.uid)
      if (!userData) await createUserAsync(user)
      router.push('/')
    }
    setGoogleLoading(false)
  }

  return (
    <Box pt={10}>
      <Head>
        <title>Clipnoard | Welcome</title>
      </Head>
      <Container maxWidth="xs">
        <Box mb={4} textAlign="center">
          <Typography variant="h5">WELCOME TO</Typography>
          <Typography variant="h4" color="primary">
            CLIPNOARD
          </Typography>
        </Box>

        <Button
          onClick={handleGoogleLogin}
          size="large"
          variant="contained"
          color="primary"
          disabled={googleLoading}
          startIcon={googleLoading ? <CircularProgress size={20} /> : null}
          fullWidth
        >
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
