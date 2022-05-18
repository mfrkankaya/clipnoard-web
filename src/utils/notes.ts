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

  return notes
    .filter(({ title, note }) => {
      return (
        title.toLocaleLowerCase().includes(lowerSearchText) ||
        note.toLocaleLowerCase().includes(lowerSearchText)
      )
    })
    .sort((a, b) => {
      const includedTextA = a.title
        .toLocaleLowerCase()
        .includes(lowerSearchText)
        ? a.title.toLocaleLowerCase()
        : a.note.toLocaleLowerCase()

      const includedTextB = b.title
        .toLocaleLowerCase()
        .includes(lowerSearchText)
        ? b.title.toLocaleLowerCase()
        : b.note.toLocaleLowerCase()

      return (
        includedTextA.indexOf(searchText) - includedTextB.indexOf(searchText)
      )
    })
}

export const getLocalNotes = (): Note[] => {
  if (
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined'
  )
    return []

  const localNotes = localStorage.getItem('LOCAL_NOTES')

  if (localNotes) {
    return JSON.parse(localNotes) as Note[]
  }

  return []
}

export const setLocalNotes = (notes: Note[]) => {
  if (
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined'
  )
    return

  localStorage.setItem('LOCAL_NOTES', JSON.stringify(notes))
}
