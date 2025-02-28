import {ReactNode} from "react";
import {geistMono, geistSans} from "@/styles/fonts";

import "../styles/globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function RootLayout({children}: RootLayoutProps) {
  return (
    <html>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {children}
    </body>
    </html>
  );
}
