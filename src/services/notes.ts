import {
  doc,
  setDoc,
  query,
  where,
  orderBy,
  collection,
  getDocs,
  deleteDoc
} from 'firebase/firestore'
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
  await setDoc(doc(firestore, 'notes', note.id), note)
  return note
}

export const deleteNoteAsync = async (noteId: string) => {
  await deleteDoc(doc(firestore, 'notes', noteId))
  return true
}
