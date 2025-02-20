'use client';

import {SessionProvider} from "next-auth/react";
import Head from "next/head";
import {MainLayout} from "@/components/pages/MainLayout";

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
