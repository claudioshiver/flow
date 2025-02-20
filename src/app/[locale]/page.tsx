'use client';

import {SessionProvider} from "next-auth/react";
import {MainLayout} from "@/components/pages/MainLayout";
import Head from "next/head";

export default function AppPage() {
  return (
    <SessionProvider>
      <Head>
        <meta name="google-site-verification" content="Z8NLIvW2401bzDzN1e3lPLul7sRbAEgUmpDDkvHd1O8"/>
      </Head>
      <MainLayout/>
    </SessionProvider>
  );
}
