import Masonry from '@mui/lab/Masonry'
import { useAppDispatch, useAppSelector } from 'hooks'
import { fetchInitialNotes } from 'store/notesSlice'
import NoteItem from './NoteItem'
import { useDebounce, useEffectOnce, useUpdateEffect } from 'usehooks-ts'
import { useMemo } from 'react'
import { isOnline, searchNotes, setLocalNotes } from 'utils'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { openCreateModal } from 'store/appSlice'

const NoteList = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)
  const searchText = useAppSelector((state) => state.searchBar.searchText)
  const { isInitialized, data, loading } = useAppSelector(
    (state) => state.notes
  )
  const debouncedSearchText = useDebounce(searchText, 200)
  const filteredData = useMemo(() => {
    if (!debouncedSearchText) return data
    return searchNotes(data, debouncedSearchText)
  }, [debouncedSearchText, data])

  const syncLocalNotes = () => {
    setLocalNotes(data)
  }

  useEffectOnce(() => {
    if (!isInitialized && isOnline())
      dispatch(fetchInitialNotes(user?.uid as string))
  })

  useUpdateEffect(syncLocalNotes, [data])

  if (loading)
    return (
      <Box mt={10} mx="auto" width="fit-content">
        <CircularProgress size={48} color="primary" />
      </Box>
    )

  if (!Boolean(filteredData.length))
    return (
      <Box mt={10} textAlign="center">
        <Typography variant="h6" color="text.secondary" mb={4}>
          Looks like you don't have any notes yet.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => dispatch(openCreateModal())}
        >
          Create one now
        </Button>
      </Box>
    )

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
