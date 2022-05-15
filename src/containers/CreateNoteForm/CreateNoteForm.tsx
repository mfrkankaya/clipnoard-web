import { Add } from '@mui/icons-material'
import { Button, CircularProgress, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'hooks'
import { createNoteAsync } from 'services'
import { addNote } from 'store/notesSlice'
import { CreateNoteSchema, generateNote } from 'utils'

const CreateNoteForm = () => {
  const user = useAppSelector((state) => state.app.user)
  const dispatch = useAppDispatch()
  const { values, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { note: '' },
      validationSchema: CreateNoteSchema,
      onSubmit: async (values, { setSubmitting, setFieldValue }) => {
        try {
          const newNote = generateNote(values.note, user?.uid as string)
          await createNoteAsync(newNote)
          dispatch(addNote(newNote))
          setFieldValue('note', '')
        } catch (error) {
          console.error(error)
        } finally {
          setSubmitting(false)
        }
      }
    })

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        id="note"
        name="note"
        type="text"
        label="Your note"
        variant="outlined"
        value={values.note}
        onChange={handleChange}
        onBlur={handleBlur}
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
  )
}

export default CreateNoteForm
