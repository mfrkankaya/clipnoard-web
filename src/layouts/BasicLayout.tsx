import { Add, Settings } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import CreateNoteForm from 'containers/CreateNoteForm'
import { useAppSelector } from 'hooks'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { openCreateModal } from 'store/appSlice'

const BasicLayout: FC<{ children?: any }> = ({ children }) => {
  const dispatch = useDispatch()
  const { isCreateModalActive } = useAppSelector((state) => state.app)

  return (
    <Fragment>
      <AppBar position="fixed" elevation={2}>
        <Toolbar>
          <Typography flex={1} variant="h6">
            CLIPNOARD
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            sx={{ mr: 1, display: ['none', 'flex'] }}
            onClick={() => dispatch(openCreateModal())}
          >
            Create note
          </Button>

          <Link href="/settings" passHref>
            <IconButton>
              <Settings />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      <Box>{children}</Box>

      {isCreateModalActive && <CreateNoteForm />}
    </Fragment>
  )
}

export default BasicLayout
