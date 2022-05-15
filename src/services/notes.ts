import {
  doc,
  setDoc,
  query,
  where,
  orderBy,
  collection,
  getDocs
} from 'firebase/firestore'
import { generateNote } from 'utils'
import { firestore } from './firestore'

const notesRef = collection(firestore, 'notes')

export const getNotesAsync = async (userId: string): Promise<Note[]> => {
  const querySnap = await getDocs(
    query(notesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
  )

  if (querySnap.empty) return []
  return querySnap.docs.map((doc) => doc.data()) as Note[]
}

export const createNoteAsync = async (note: Note) => {
  // const newNote = generateNote(note, userId)
  await setDoc(doc(firestore, 'notes', note.id), note)
  return note
}
