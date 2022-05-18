import { useEffect, useState } from 'react'

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const onlineListener = () => {
      setIsOnline(true)
    }
    const offlineListener = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', onlineListener)
    window.addEventListener('offline', offlineListener)

    return () => {
      window.removeEventListener('online', onlineListener)
      window.removeEventListener('offline', onlineListener)
    }
  }, [])

  return isOnline
}
