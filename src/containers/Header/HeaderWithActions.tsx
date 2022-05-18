import { Add, Settings } from '@mui/icons-material'
import { Button, IconButton, Link, Grid } from '@mui/material'
import { SearchBar } from 'components'
import { useAppSelector } from 'hooks'
import NextLink from 'next/link'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'

const HeaderWithActions = () => {
  const dispatch = useDispatch()
  const isOnline = useAppSelector((state) => state.app.isOnline)

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={4}
        md={4}
        sx={{
          display: { xs: 'none', md: 'flex' },
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
        xs={10}
        sm={7}
        md={4}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <SearchBar />
      </Grid>

      <Grid
        item
        xs={2}
        sm={5}
        md={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Add />}
          sx={{ mr: 1, display: ['none', 'flex'] }}
          onClick={() => dispatch(openCreateModal())}
          disabled={!isOnline}
        >
          Create note
        </Button>

        <NextLink href="/settings" passHref>
          <IconButton sx={{ color: 'white' }}>
            <Settings />
          </IconButton>
        </NextLink>
      </Grid>
    </Grid>
  )
}

export default HeaderWithActions
