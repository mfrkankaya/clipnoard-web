import { Box, Container } from '@mui/material'
import AuthRequired from 'containers/AuthRequired'
import CreateNoteForm from 'containers/CreateNoteForm'
import NoteList from 'containers/NoteList'
import BasicLayout from 'layouts/BasicLayout'

const HomePage = () => {
  return (
    <AuthRequired>
      <BasicLayout>
        <Box pt={[7, 8]}>
          <Container>
            <Box my={2}>
              <CreateNoteForm />
            </Box>

            <NoteList />
          </Container>
        </Box>
      </BasicLayout>
    </AuthRequired>
  )
}

export default HomePage
