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
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'
import {
  closeFirstNoteTipDialog,
  setIsFirstNoteTipSeenBefore
} from 'store/notesSlice'
import { useUpdateEffect } from 'usehooks-ts'

const HomePage = () => {
  const dispatch = useDispatch()
  const { isOnline, user } = useAppSelector((state) => state.app)
  const isFirstNoteTipOpen = useAppSelector(
    (state) => state.notes.showFirstNoteTip
  )

  useUpdateEffect(() => {
    dispatch(setIsFirstNoteTipSeenBefore(Boolean(user?.isAnyNoteCreatedBefore)))
  }, [user])

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
