import { AppBar, Box, Toolbar } from '@mui/material'
import CreateNoteForm from 'containers/CreateNoteForm'
import HeaderWithActions from 'containers/Header/HeaderWithActions'
import HeaderWithoutActions from 'containers/Header/HeaderWithoutActions'
import { useAppSelector } from 'hooks'
import { FC, Fragment } from 'react'

interface Props {
  children?: any
  hideNoteActions?: boolean
}

const BasicLayout: FC<Props> = ({ children, hideNoteActions = false }) => {
  const { isCreateModalActive } = useAppSelector((state) => state.app)

  return (
    <Fragment>
      <AppBar position="fixed" elevation={2}>
        <Toolbar>
          {hideNoteActions ? <HeaderWithoutActions /> : <HeaderWithActions />}
        </Toolbar>
      </AppBar>

      <Box>{children}</Box>

      {isCreateModalActive && <CreateNoteForm />}
    </Fragment>
  )
}

export default BasicLayout
