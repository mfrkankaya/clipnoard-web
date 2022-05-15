type ThemeMode = 'dark' | 'light'
type Language = 'en' | 'tr'

interface Note {
  id: string
  userId: string
  title: string
  note: string
  createdAt: number
}
