import { Add, Settings } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Link,
  Grid
} from '@mui/material'
import { SearchBar } from 'components'
import CreateNoteForm from 'containers/CreateNoteForm'
import { useAppSelector } from 'hooks'
import NextLink from 'next/link'
import { FC, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'

interface Props {
  children?: any
  hideNoteActions?: boolean
}

const BasicLayout: FC<Props> = ({ children, hideNoteActions = false }) => {
  const dispatch = useDispatch()
  const { isCreateModalActive } = useAppSelector((state) => state.app)

  return (
    <Fragment>
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
                <Link
                  underline="none"
                  flex={1}
                  variant="h6"
                  sx={{ color: 'white' }}
                >
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

      <Box>{children}</Box>

      {isCreateModalActive && <CreateNoteForm />}
    </Fragment>
  )
}

export default BasicLayout
