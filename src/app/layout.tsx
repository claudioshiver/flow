import {ReactNode} from "react";
import {geistMono, geistSans} from "@/styles/fonts";

import "../styles/globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function RootLayout({children, params}: RootLayoutProps) {
  const {locale} = await params

  return (
    <html lang={locale}>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {children}
    </body>
    </html>
  );
}
