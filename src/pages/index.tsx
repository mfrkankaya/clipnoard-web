import { Add } from '@mui/icons-material'
import { Box, Container, Fab } from '@mui/material'
import AuthRequired from 'containers/AuthRequired'
import NoteList from 'containers/NoteList'
import { useAppSelector } from 'hooks'
import BasicLayout from 'layouts/BasicLayout'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const isOnline = useAppSelector((state) => state.app.isOnline)

  return (
    <AuthRequired>
      <Head>
        <title>Clipnoard | Home</title>
      </Head>

      <BasicLayout>
        <Box pt={[7, 8]}>
          <Container>
            <Box mt={2}>
              <NoteList />
            </Box>
          </Container>
        </Box>

        <Fab
          onClick={() => dispatch(openCreateModal())}
          color="primary"
          disabled={!isOnline}
          sx={{
            display: ['flex', 'none'],
            position: 'fixed',
            right: 16,
            bottom: 16
          }}
        >
          <Add />
        </Fab>
      </BasicLayout>
    </AuthRequired>
  )
}

export default HomePage
