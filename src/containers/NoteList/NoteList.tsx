import Masonry from '@mui/lab/Masonry'
import { useAppDispatch, useAppSelector } from 'hooks'
import { fetchInitialNotes } from 'store/notesSlice'
import NoteItem from './NoteItem'
import { useEffectOnce } from 'usehooks-ts'

const NoteList = () => {
  const user = useAppSelector((state) => state.app.user)
  const dispatch = useAppDispatch()
  const { isInitialized, data } = useAppSelector((state) => state.notes)

  useEffectOnce(() => {
    if (!isInitialized) dispatch(fetchInitialNotes(user?.uid as string))
  })

  return (
    <Masonry sx={{ width: 'unset' }} columns={[1, 2, 3]} spacing={2}>
      {data.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </Masonry>
  )
}

export default NoteList