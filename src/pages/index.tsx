import { Add } from '@mui/icons-material'
import { Box, Container, Fab } from '@mui/material'
import AuthRequired from 'containers/AuthRequired'
import CreateNoteForm from 'containers/CreateNoteForm'
import NoteList from 'containers/NoteList'
import BasicLayout from 'layouts/BasicLayout'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'

const HomePage = () => {
  const dispatch = useDispatch()

  return (
    <AuthRequired>
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
