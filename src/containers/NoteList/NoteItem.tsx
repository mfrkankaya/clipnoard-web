import { Delete, MoreVert } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Typography
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'hooks'
import { FC, MouseEvent, useState } from 'react'
import { deleteNoteAsync } from 'services'
import { removeNote } from 'store/notesSlice'
import { useCopyToClipboard } from 'usehooks-ts'

const NoteItem: FC<Note> = ({ id, note, title }) => {
  const dispatch = useAppDispatch()
  const isOnline = useAppSelector((state) => state.app.isOnline)
  const [isDeleteDialogActive, setIsDeleteDialogActive] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [, copy] = useCopyToClipboard()
  const [snackStatus, setSnackStatus] = useState(false)
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleClick = () => {
    copy(note)
    setSnackStatus(true)
  }

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleDeleteClick = () => {
    handleMenuClose()
    setIsDeleteDialogActive(true)
  }

  const deleteNote = async () => {
    setIsDeleteDialogActive(false)
    await deleteNoteAsync(id)
    dispatch(removeNote(id))
  }

  // const handleEditClick = () => {
  //   handleMenuClose()
  // }

  return (
    <Box>
      <Card variant="outlined" color="card">
        <Paper sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <CardActionArea onClick={handleClick}>
            <CardContent>
              <Typography variant="h6" color="primary">
                {title}
              </Typography>
              <Typography color="text.secondary">{note}</Typography>
            </CardContent>
          </CardActionArea>

          <Box m={1}>
            <IconButton
              id="more-button"
              aria-label="more"
              aria-controls={isMenuOpen ? 'long-menu' : undefined}
              aria-expanded={isMenuOpen ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVert />
            </IconButton>
          </Box>

          <Menu
            id="more-menu"
            MenuListProps={{
              'aria-labelledby': 'more-button'
            }}
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDeleteClick} disabled={!isOnline}>
              Delete note
            </MenuItem>
            {/* <MenuItem onClick={handleEditClick}>Edit note</MenuItem> */}
          </Menu>

          <Dialog
            open={isDeleteDialogActive}
            onClose={() => setIsDeleteDialogActive(false)}
          >
            <DialogTitle>You're about to delete "{title}".</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This action can't be undone. Do you still want to delete it?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDeleteDialogActive(false)}>
                Close
              </Button>
              <Button onClick={deleteNote} color="error" startIcon={<Delete />}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={snackStatus}
            autoHideDuration={2500}
            onClose={() => setSnackStatus(false)}
          >
            <Alert severity="info" sx={{ width: '100%' }}>
              Copied: {title}
            </Alert>
          </Snackbar>
        </Paper>
      </Card>
    </Box>
  )
}

export default NoteItem
