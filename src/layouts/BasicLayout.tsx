import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { FC, Fragment } from 'react'

const BasicLayout: FC<{ children?: any }> = ({ children }) => {
  return (
    <Fragment>
      <AppBar position="fixed" elevation={2}>
        <Toolbar>
          <Typography flex={1} variant="h6">
            CLIPNOARD
          </Typography>
        </Toolbar>
      </AppBar>

      <Box>{children}</Box>
    </Fragment>
  )
}

export default BasicLayout
