'use client';

import {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";
import Head from "next/head";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>

export default function MainLayout({children}: MainLayoutProps) {
  return (
    <SessionProvider>
      <Head>
        <meta name="google-site-verification" content="Z8NLIvW2401bzDzN1e3lPLul7sRbAEgUmpDDkvHd1O8"/>
      </Head>
      {children}
    </SessionProvider>
  );
}
