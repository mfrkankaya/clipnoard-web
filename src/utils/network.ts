export const isOnline = () => {
  if (!window) return true
  if (typeof navigator.onLine === 'undefined') return true
  return navigator.onLine
}
