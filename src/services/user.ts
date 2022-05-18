import { getAdditionalUserInfo, User } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { firestore } from './firestore'

export const createUserAsync = async (user: User) =>
  setDoc(doc(firestore, 'users', user.uid), {
    id: user.uid,
    email: user.email,
    isAnyNoteCreatedBefore: false
  })

export const getUserAsync = async (userId: string) => {
  const userRef = await getDoc(doc(firestore, 'users', userId))
  if (userRef.exists()) return userRef.data() as CustomUser
  return undefined
}

export const updateUserAsync = async (
  user: { id: string } & Partial<CustomUser>
) => {
  await updateDoc(doc(firestore, 'users', user.id), user)
  return true
}
