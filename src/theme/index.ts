import { createTheme } from '@mui/material/styles'

const generateTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode
    }
  })

export default generateTheme
