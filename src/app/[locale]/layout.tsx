import {ReactNode} from "react";
import type {Metadata, Viewport} from "next";
import {getCurrentLocale, getI18n} from "@/locales/lib/server";
import {I18nProviderClient} from "@/locales/lib/client";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: "Flow",
    description: t('description'),
  }
}

export default async function MainLayout({children}: MainLayoutProps) {
  const locale = await getCurrentLocale();

  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  );
}
