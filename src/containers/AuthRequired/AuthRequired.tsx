import { FC } from 'react'
import { useAppSelector } from 'hooks'

const AuthRequired: FC<{ children: any }> = ({ children }) => {
  const { user, isUserInitialized } = useAppSelector((state) => state.app)

  if (user) return children
  if (isUserInitialized) window.location.href = '/auth/welcome'
  return null
}

export default AuthRequired
