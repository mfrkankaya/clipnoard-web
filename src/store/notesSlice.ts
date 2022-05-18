import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getNotesAsync } from 'services'
import { getLocalNotes, isFirstNoteTipSeen } from 'utils'

interface NotesState {
  isInitialized: boolean
  data: Note[]
  loading: boolean
  error: any
  showFirstNoteTip: boolean
}

const initialState: NotesState = {
  isInitialized: false,
  data: getLocalNotes(),
  loading: false,
  error: false,
  showFirstNoteTip: false
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
      const currentLength = state.data.length
      if (currentLength === 0 && !isFirstNoteTipSeen())
        state.showFirstNoteTip = true

      state.data.unshift(action.payload)
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((note) => note.id !== action.payload)
    },
    closeFirstNoteTipDialog: (state) => {
      state.showFirstNoteTip = false
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

export const { addNote, removeNote, closeFirstNoteTipDialog } =
  notesSlice.actions
