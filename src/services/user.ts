import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from './firestore'

export const createUserAsync = (user: User) =>
  setDoc(doc(firestore, 'users', user.uid), { id: user.uid, email: user.email })
