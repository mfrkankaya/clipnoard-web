import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from 'theme'
import { createEmotionCache, getInitialThemeMode } from 'utils'
import { Provider } from 'react-redux'
import { store } from 'store'
import { handleAuthStateChange } from 'services'
import { setUser, toggleThemeMode } from 'store/appSlice'
import { useEffectOnce } from 'usehooks-ts'
import { useState } from 'react'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark')

  useEffectOnce(() => {
    handleAuthStateChange((user) => {
      store.dispatch(setUser(user))
    })

    let currentThemeMode = store.getState().app.themeMode
    const handleChange = () => {
      let previousThemeMode = currentThemeMode
      currentThemeMode = store.getState().app.themeMode
      if (previousThemeMode !== currentThemeMode) setThemeMode(currentThemeMode)
    }
    const unsubscribe = store.subscribe(handleChange)
    store.dispatch(toggleThemeMode(getInitialThemeMode()))
    return () => unsubscribe()
  })

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme(themeMode)}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}
