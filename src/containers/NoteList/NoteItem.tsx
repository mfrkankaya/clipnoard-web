import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Snackbar,
  Typography
} from '@mui/material'
import { FC, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

const NoteItem: FC<Note> = ({ note }) => {
  const [value, copy] = useCopyToClipboard()
  const [snackStatus, setSnackStatus] = useState(false)

  const handleClick = () => {
    copy(note)
    setSnackStatus(true)
  }

  return (
    <Box>
      <Card variant="outlined">
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography>{note}</Typography>
          </CardContent>
        </CardActionArea>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackStatus}
          autoHideDuration={2500}
          onClose={() => setSnackStatus(false)}
        >
          <Alert severity="info" sx={{ width: '100%' }}>
            Copied: {note}
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  )
}

export default NoteItem
