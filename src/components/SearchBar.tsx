import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { InputBase } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setSearchText } from 'store/searchBarSlice'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  '& .MuiInputBase-root': {
    width: '100%'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%'
  }
}))

const SearchBar = () => {
  const dispatch = useAppDispatch()
  const searchText = useAppSelector((state) => state.searchBar.searchText)

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        autoComplete="off"
        placeholder="Search your notes"
        inputProps={{ 'aria-label': 'search' }}
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
      />
    </Search>
  )
}

export default SearchBar
