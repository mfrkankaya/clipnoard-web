import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from './appSlice'
import { notesSlice } from './notesSlice'
import { searchBarSlice } from './searchBarSlice'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    notes: notesSlice.reducer,
    searchBar: searchBarSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
