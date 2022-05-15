import { Box, Container } from '@mui/material'
import CreateNoteForm from 'containers/CreateNoteForm'
import NoteList from 'containers/NoteList'
import BasicLayout from 'layouts/BasicLayout'

const HomePage = () => {
  return (
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
  )
}

export default HomePage
