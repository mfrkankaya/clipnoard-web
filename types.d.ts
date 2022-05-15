type ThemeMode = 'dark' | 'light'
type Language = 'en' | 'tr'

interface Note {
  id: string
  userId: string
  note: string
  createdAt: number
}
