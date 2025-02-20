import {ReactNode} from "react";
import type {Metadata, Viewport} from "next";
import {getI18n} from "@/locales/lib/server";
import {I18nProviderClient} from "@/locales/lib/client";
import {setStaticParamsLocale} from "next-international/server";

type MainLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export async function generateMetadata({params}: MainLayoutProps): Promise<Metadata> {
  const {locale} = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return {
    title: "Flow",
    description: t('description'),
    other: {
      "google-site-verification": "Z8NLIvW2401bzDzN1e3lPLul7sRbAEgUmpDDkvHd1O8"
    }
  }
}

export default async function MainLayout({children, params}: MainLayoutProps) {
  const {locale} = await params;

  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  );
}
