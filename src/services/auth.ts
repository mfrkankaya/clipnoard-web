import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  NextOrObserver,
  sendPasswordResetEmail,
  User,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { removeLocalNotes } from 'utils'
import { app } from './app'

export const auth = getAuth(app)

export const signInAsync = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const signUpAsync = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

export const handleAuthStateChange = (nextOrObserver: NextOrObserver<User>) => {
  onAuthStateChanged(auth, nextOrObserver)
}

export const sendEmailVerificationAsync = (user: User) =>
  sendEmailVerification(user)

export const sendPasswordResetEmailAsync = (email: string) =>
  sendPasswordResetEmail(auth, email)

export const signOutAsync = async () => {
  removeLocalNotes()
  return signOut(auth)
}

export const signInWithGoogleAsync = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  return result.user
}
