import {ReactNode} from "react";
import {I18nProviderClient} from "@/locales/lib/client";

type MainLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>
}>

export default async function MainLayout({children, params}: MainLayoutProps) {
  const { locale } = await params

  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  );
}
