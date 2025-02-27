import {ReactNode} from "react";
import type {Metadata, Viewport} from "next";
import {getI18n} from "@/locales/lib/server";
import {I18nProviderClient} from "@/locales/lib/client";
import {setStaticParamsLocale} from "next-international/server";
import {APP_NAME} from "@/lib/constants";
import AlertsProvider from "@/components/providers/AlertsProvider";
import SwrProvider from "@/components/providers/SwrProvider";
import AppProvider from "@/components/providers/AppProvider";

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
    title: APP_NAME,
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
      <AlertsProvider>
        <SwrProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </SwrProvider>
      </AlertsProvider>
    </I18nProviderClient>
  );
}
