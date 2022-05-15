import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface AppState {
  isUserInitialized: boolean
  user: User | null
  themeMode: ThemeMode
}

const initialState: AppState = {
  isUserInitialized: false,
  user: null,
  themeMode: 'dark'
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
    }
  }
})

export const { setUser, toggleThemeMode } = appSlice.actions
