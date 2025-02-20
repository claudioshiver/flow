import {useSession} from "next-auth/react";
import LoginPage from "@/components/pages/LoginPage";
import MainPage from "@/components/pages/MainPage";
import type {Metadata} from "next";
import {getI18n} from "@/locales/lib/server";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: "Flow",
    description: t('description'),
  }
}

export default function AppPage() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="Z8NLIvW2401bzDzN1e3lPLul7sRbAEgUmpDDkvHd1O8"/>
      </Head>
      {!session ? <LoginPage/> : <MainPage/>}
    </>
  )
}
