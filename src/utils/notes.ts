import { v4 } from 'uuid'

export const generateNote = (note: string, userId: string): Note => ({
  id: v4(),
  note,
  userId,
  createdAt: new Date().getTime()
})
