import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getNotesAsync } from 'services'

interface NotesState {
  isInitialized: boolean
  data: Note[]
  loading: boolean
  error: any
}

const initialState: NotesState = {
  isInitialized: false,
  data: [],
  loading: false,
  error: false
}

export const fetchInitialNotes = createAsyncThunk(
  'fetchInitialNotes',
  async (userId: string) => {
    return await getNotesAsync(userId)
  }
)

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.data.unshift(action.payload)
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((note) => note.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialNotes.pending, (state, action) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchInitialNotes.fulfilled, (state, action) => {
      state.isInitialized = true
      state.loading = false
      state.error = false
      state.data = action.payload
    })

    builder.addCase(fetchInitialNotes.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
  }
})

export const { addNote, removeNote } = notesSlice.actions
