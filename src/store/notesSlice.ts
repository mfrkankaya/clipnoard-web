import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getNotesAsync, updateUserAsync } from 'services'
import { getLocalNotes } from 'utils'

interface NotesState {
  isInitialized: boolean
  data: Note[]
  loading: boolean
  error: any
  showFirstNoteTip: boolean
  isFirstNoteTipSeenBefore: boolean
}

const initialState: NotesState = {
  isInitialized: false,
  data: getLocalNotes(),
  loading: false,
  error: false,
  showFirstNoteTip: false,
  isFirstNoteTipSeenBefore: true
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
      const isTipSeenBefore = state.isFirstNoteTipSeenBefore

      if (currentLength === 0 && !isTipSeenBefore) {
        state.showFirstNoteTip = true
        state.isFirstNoteTipSeenBefore = true

        updateUserAsync({
          id: window.USER?.uid as string,
          isAnyNoteCreatedBefore: true
        })
      }

      state.data.unshift(action.payload)
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((note) => note.id !== action.payload)
    },
    closeFirstNoteTipDialog: (state) => {
      state.showFirstNoteTip = false
    },
    setIsFirstNoteTipSeenBefore: (state, action: PayloadAction<boolean>) => {
      state.isFirstNoteTipSeenBefore = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialNotes.pending, (state) => {
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

export const {
  addNote,
  removeNote,
  closeFirstNoteTipDialog,
  setIsFirstNoteTipSeenBefore
} = notesSlice.actions
