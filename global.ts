import { User } from 'firebase/auth'

declare global {
  interface Window {
    USER: (User & CustomUser) | null
  }
}
