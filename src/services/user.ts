import { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from './firestore'

export const createUserAsync = async (user: User) =>
  setDoc(doc(firestore, 'users', user.uid), { id: user.uid, email: user.email })

export const checkUserAsync = async (userId: string) => {
  const userRef = await getDoc(doc(firestore, 'users', userId))
  return userRef.exists()
}
