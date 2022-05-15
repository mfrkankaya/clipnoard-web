export const getInitialThemeMode = (): ThemeMode => {
  const localThemeMode = localStorage.getItem('THEME_MODE')
  if (localThemeMode) return localThemeMode as ThemeMode

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return isDark ? 'dark' : 'light'
}
