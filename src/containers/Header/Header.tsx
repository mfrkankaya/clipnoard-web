import { Add, Settings } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Link, Grid } from '@mui/material'
import { SearchBar } from 'components'
import NextLink from 'next/link'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'

interface Props {
  hideNoteActions: boolean
}

const Header: FC<Props> = ({ hideNoteActions = false }) => {
  const dispatch = useDispatch()

  return (
    <AppBar position="fixed" elevation={2}>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            md={4}
            sx={{
              display: { xs: hideNoteActions ? 'flex' : 'none', md: 'flex' },
              alignItems: 'center'
            }}
          >
            <NextLink href="/" passHref>
              <Link underline="none" variant="h6" sx={{ color: 'white' }}>
                CLIPNOARD
              </Link>
            </NextLink>
          </Grid>

          <Grid
            item
            xs={hideNoteActions ? 4 : 10}
            sm={hideNoteActions ? 4 : 7}
            md={4}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {!hideNoteActions && <SearchBar />}
          </Grid>

          <Grid
            item
            xs={hideNoteActions ? 4 : 2}
            sm={hideNoteActions ? 4 : 5}
            md={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            {!hideNoteActions && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                sx={{ mr: 1, display: ['none', 'flex'] }}
                onClick={() => dispatch(openCreateModal())}
              >
                Create note
              </Button>
            )}

            <NextLink href="/settings" passHref>
              <IconButton sx={{ color: 'white' }}>
                <Settings />
              </IconButton>
            </NextLink>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
