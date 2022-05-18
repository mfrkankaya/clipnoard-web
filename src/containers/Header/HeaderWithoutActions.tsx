import { Settings } from '@mui/icons-material'
import { IconButton, Link } from '@mui/material'
import { Box } from '@mui/system'
import NextLink from 'next/link'
import { Fragment } from 'react'

const HeaderWithoutActions = () => {
  return (
    <Fragment>
      <Box flex={1}>
        <NextLink href="/" passHref>
          <Link underline="none" variant="h6" sx={{ color: 'white' }}>
            CLIPNOARD
          </Link>
        </NextLink>
      </Box>

      <NextLink href="/settings" passHref>
        <IconButton sx={{ color: 'white' }}>
          <Settings />
        </IconButton>
      </NextLink>
    </Fragment>
  )
}

export default HeaderWithoutActions
