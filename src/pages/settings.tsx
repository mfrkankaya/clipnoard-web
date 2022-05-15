import { Logout } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Stack,
  Switch
} from '@mui/material'
import AuthRequired from 'containers/AuthRequired'
import { useAppDispatch, useAppSelector } from 'hooks'
import BasicLayout from 'layouts/BasicLayout'
import { ChangeEventHandler } from 'react'
import { signOutAsync } from 'services'
import { toggleThemeMode } from 'store/appSlice'
import { useUpdateEffect } from 'usehooks-ts'

const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const { themeMode } = useAppSelector((state) => state.app)

  const handleThemeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) dispatch(toggleThemeMode('dark'))
    else dispatch(toggleThemeMode('light'))
  }

  useUpdateEffect(() => {
    localStorage.setItem('THEME_MODE', themeMode)
  }, [themeMode])

  return (
    <AuthRequired>
      <BasicLayout hideCreate>
        <Box pt={[7, 8]}>
          <Container sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={themeMode === 'dark'}
                    onChange={handleThemeChange}
                  />
                }
                label="Dark theme"
              />

              <Button
                onClick={signOutAsync}
                variant="outlined"
                startIcon={<Logout />}
              >
                Logout
              </Button>
            </Stack>
          </Container>
        </Box>
      </BasicLayout>
    </AuthRequired>
  )
}

export default SettingsPage
