import { Add, Settings } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar, Link } from '@mui/material'
import CreateNoteForm from 'containers/CreateNoteForm'
import { useAppSelector } from 'hooks'
import NextLink from 'next/link'
import { FC, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'

interface Props {
  children?: any
  hideCreate?: boolean
}

const BasicLayout: FC<Props> = ({ children, hideCreate = false }) => {
  const dispatch = useDispatch()
  const { isCreateModalActive } = useAppSelector((state) => state.app)

  return (
    <Fragment>
      <AppBar position="fixed" elevation={2}>
        <Toolbar>
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

          {!hideCreate && (
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
        </Toolbar>
      </AppBar>

      <Box>{children}</Box>

      {isCreateModalActive && <CreateNoteForm />}
    </Fragment>
  )
}

export default BasicLayout
