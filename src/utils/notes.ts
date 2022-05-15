import { v4 } from 'uuid'

type GenerateNotePayload = Pick<Note, 'note' | 'title' | 'userId'>

export const generateNote = ({
  title,
  note,
  userId
}: GenerateNotePayload): Note => ({
  id: v4(),
  title,
  note,
  userId,
  createdAt: new Date().getTime()
})

export const searchNotes = (notes: Note[], searchText: string): Note[] => {
  const lowerSearchText = searchText.toLocaleLowerCase()

  return notes.filter(({ title, note }) => {
    return (
      title.toLocaleLowerCase().includes(lowerSearchText) ||
      note.toLocaleLowerCase().includes(lowerSearchText)
    )
  })
}
