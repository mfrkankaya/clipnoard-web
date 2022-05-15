import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from './appSlice'
import { notesSlice } from './notesSlice'

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    app: appSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
