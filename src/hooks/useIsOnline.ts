import { useEffect, useState } from 'react'
import { isOnline as checkNetwork } from 'utils'

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(checkNetwork())

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
