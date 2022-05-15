import Masonry from '@mui/lab/Masonry'
import { useAppDispatch, useAppSelector } from 'hooks'
import { fetchInitialNotes } from 'store/notesSlice'
import NoteItem from './NoteItem'
import { useDebounce, useEffectOnce } from 'usehooks-ts'
import { useMemo } from 'react'
import { searchNotes } from 'utils'

const NoteList = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)
  const searchText = useAppSelector((state) => state.searchBar.searchText)
  const { isInitialized, data } = useAppSelector((state) => state.notes)
  const debouncedSearchText = useDebounce(searchText, 200)
  const filteredData = useMemo(() => {
    if (!debouncedSearchText) return data
    return searchNotes(data, debouncedSearchText)
  }, [debouncedSearchText, data])

  useEffectOnce(() => {
    if (!isInitialized) dispatch(fetchInitialNotes(user?.uid as string))
  })

  return (
    <Masonry
      sx={{ width: 'unset' }}
      columns={[1, 2, filteredData.length > 2 ? 3 : 2]}
      spacing={2}
    >
      {filteredData.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </Masonry>
  )
}

export default NoteList
