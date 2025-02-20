import {ReactNode} from "react";
import {geistMono, geistSans} from "@/styles/fonts";
import {getCurrentLocale} from "@/locales/lib/server";

import "../styles/globals.css";
import {setStaticParamsLocale} from "next-international/server";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function RootLayout({children}: RootLayoutProps) {
  setStaticParamsLocale('en')
  const locale = await getCurrentLocale()

  return (
      <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
      </body>
      </html>
  );
}
