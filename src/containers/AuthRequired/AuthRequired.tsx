import { FC } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { Box, Button, Container, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { setIsUserInitialized } from 'store/appSlice'

const AuthRequired: FC<{ children: any }> = ({ children }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, isUserInitialized } = useAppSelector((state) => state.app)

  if (user) return children

  if (isUserInitialized) {
    window.location.href = '/auth/welcome'
    // return (
    //   <Box pt={10}>
    //     <Container maxWidth="xs">
    //       <Box textAlign="center">
    //         <Typography variant="h5">Authentication required.</Typography>
    //         <Typography variant="body1" color="text.secondary" my={2}>
    //           You're not logged in. You need to login to see this content.
    //         </Typography>

    //         <NextLink href="/auth/login">
    //           <Button size="large" variant="contained">
    //             Login now
    //           </Button>
    //         </NextLink>
    //       </Box>
    //     </Container>
    //   </Box>
    // )
  }
  return null
}

export default AuthRequired
