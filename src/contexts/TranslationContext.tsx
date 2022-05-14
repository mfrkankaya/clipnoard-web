import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState
} from 'react'
import locales from 'locales'

interface TranslationContextState {
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
  t: (key: keyof typeof locales.en) => string
}

const INITIAL_STATE: TranslationContextState = {
  language: 'en',
  setLanguage: (_) => {},
  t: (_) => ''
}

export const TranslationContext = createContext(INITIAL_STATE)

export const TranslationContextProvider: FC<{ children: any }> = ({
  children
}) => {
  const [language, setLanguage] = useState<Language>('en')
  const t = (key: keyof typeof locales.en) => locales[language][key]

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslationContext = () => useContext(TranslationContext)
