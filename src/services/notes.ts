import { User } from 'firebase/auth'
import {
  doc,
  setDoc,
  query,
  getDoc,
  where,
  orderBy,
  collection,
  getDocs,
  addDoc
} from 'firebase/firestore'
import { firestore } from './firestore'

const notesRef = collection(firestore, 'notes')

export const getNotesAsync = async (userId: string): Promise<Note[]> => {
  const querySnap = await getDocs(
    query(notesRef, where('userId', '==', userId), orderBy('createdAt'))
  )

  if (querySnap.empty) return []
  return querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Note[]
}

export const createNoteAsync = async (note: string) =>
  addDoc(notesRef, { note, createdAt: new Date().getTime() })
