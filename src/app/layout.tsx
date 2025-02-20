import {ReactNode} from "react";
import {I18nProviderClient} from "@/locales/lib/client";
import {geistMono, geistSans} from "@/styles/fonts";

import "../styles/globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>
}>;

export default async function RootLayout({children, params}: RootLayoutProps) {
  const {locale} = await params

  return (
    <I18nProviderClient locale={locale}>
      <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
      </body>
      </html>
    </I18nProviderClient>
  );
}
