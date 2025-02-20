import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } = createI18nServer({
  en: () => import('../translations/en'),
  it: () => import('../translations/it')
})