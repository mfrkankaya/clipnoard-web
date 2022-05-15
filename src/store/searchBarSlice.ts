import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchBarState {
  searchText: string
}

const initialState: SearchBarState = {
  searchText: ''
}

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    }
  }
})

export const { setSearchText } = searchBarSlice.actions
