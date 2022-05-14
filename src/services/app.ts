import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyD_9ePXNj1-S_PXkgQhp2ovp3WAJ_yIAts',
  authDomain: 'clipnoard.firebaseapp.com',
  projectId: 'clipnoard',
  storageBucket: 'clipnoard.appspot.com',
  messagingSenderId: '867691876775',
  appId: '1:867691876775:web:1c8adab656ae2ad980e682',
  measurementId: 'G-3D5JN8F9YJ'
}

export const app = initializeApp(firebaseConfig)
