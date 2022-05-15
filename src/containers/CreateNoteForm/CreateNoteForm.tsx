import { Add } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'hooks'
import { useRef } from 'react'
import { createNoteAsync } from 'services'
import { closeCreateModal } from 'store/appSlice'
import { addNote } from 'store/notesSlice'
import { CreateNoteSchema, generateNote } from 'utils'

const CreateNoteForm = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const noteRef = useRef<HTMLInputElement>(null)
  const { user } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const {
    values,
    isSubmitting,
    handleChange,
    touched,
    errors,
    handleBlur,
    handleSubmit
  } = useFormik({
    initialValues: { title: '', note: '' },
    validationSchema: CreateNoteSchema,
    onSubmit: async (values, { setSubmitting, setFieldValue, setTouched }) => {
      titleRef.current?.blur()
      noteRef.current?.blur()

      try {
        const newNote = generateNote({
          ...values,
          userId: user?.uid as string
        })
        // Add note to firebase
        await createNoteAsync(newNote)

        // Add note to redux store
        dispatch(addNote(newNote))

        setFieldValue('note', '')
        setFieldValue('title', '')
        setTouched({ title: false, note: false })
        dispatch(closeCreateModal())
      } catch (error) {
        console.error(error)
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <Dialog
      maxWidth="sm"
      onClose={() => dispatch(closeCreateModal())}
      fullWidth
      open
    >
      <DialogTitle>Create new note</DialogTitle>
      <DialogContent>
        <Stack spacing={2} component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            ref={titleRef}
            id="title"
            name="title"
            type="text"
            label="Title"
            variant="outlined"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
            fullWidth
            required
          />

          <TextField
            ref={noteRef}
            id="note"
            name="note"
            type="text"
            label="Note"
            variant="outlined"
            value={values.note}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.note && Boolean(errors.note)}
            helperText={touched.note && errors.note}
            fullWidth
            required
          />

          <Button
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <Add />}
            type="submit"
            size="large"
            variant="contained"
            disabled={isSubmitting || !values.note}
          >
            Create note
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNoteForm
