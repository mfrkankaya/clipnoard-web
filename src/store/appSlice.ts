import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface AppState {
  isUserInitialized: boolean
  user: User | null
  themeMode: ThemeMode
  isCreateModalActive: boolean
  isOnline: boolean
}

const initialState: AppState = {
  isUserInitialized: false,
  user: null,
  themeMode: 'dark',
  isCreateModalActive: false,
  isOnline: true
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
    },
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload
    },
    setIsUserInitialized: (state, action: PayloadAction<boolean>) => {
      state.isUserInitialized = action.payload
    }
  }
})

export const {
  setUser,
  toggleThemeMode,
  openCreateModal,
  closeCreateModal,
  setIsOnline,
  setIsUserInitialized
} = appSlice.actions
