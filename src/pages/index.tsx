import { useTranslationContext } from 'contexts'

const HomePage = () => {
  const { t } = useTranslationContext()

  return <div>{t('login')}</div>
}

export default HomePage
