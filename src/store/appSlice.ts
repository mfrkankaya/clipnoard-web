import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface AppState {
  isUserInitialized: boolean
  user: User | null
  themeMode: ThemeMode
  isCreateModalActive: boolean
}

const initialState: AppState = {
  isUserInitialized: false,
  user: null,
  themeMode: 'dark',
  isCreateModalActive: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isUserInitialized = true
    },
    toggleThemeMode: (state, action: PayloadAction<ThemeMode | undefined>) => {
      if (action.payload) {
        state.themeMode = action.payload
        return
      }

      state.themeMode = state.themeMode == 'dark' ? 'light' : 'dark'
    },
    openCreateModal: (state) => {
      state.isCreateModalActive = true
    },
    closeCreateModal: (state) => {
      state.isCreateModalActive = false
    }
  }
})

export const { setUser, toggleThemeMode, openCreateModal, closeCreateModal } =
  appSlice.actions
