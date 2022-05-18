import { Add } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from '@mui/material'
import AuthRequired from 'containers/AuthRequired'
import NoteList from 'containers/NoteList'
import { useAppSelector } from 'hooks'
import BasicLayout from 'layouts/BasicLayout'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'
import { closeFirstNoteTipDialog } from 'store/notesSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const isOnline = useAppSelector((state) => state.app.isOnline)
  const isFirstNoteTipOpen = useAppSelector(
    (state) => state.notes.showFirstNoteTip
  )

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

        <Dialog fullWidth maxWidth="sm" open={isFirstNoteTipOpen}>
          <DialogTitle>You created your first note!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can copy the content of your note by clickin on it.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              onClick={() => dispatch(closeFirstNoteTipDialog())}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>

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
