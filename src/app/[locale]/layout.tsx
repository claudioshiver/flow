'use client';

import {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>

export default function MainLayout({children}: MainLayoutProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
