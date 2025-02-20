import {useSession} from "next-auth/react";
import LoginPage from "@/components/pages/LoginPage";
import MainPage from "@/components/pages/MainPage";
import type {Metadata} from "next";
import {getI18n} from "@/locales/lib/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: "Flow",
    description: t('description'),
  }
}

export default function AppPage() {
  const { data: session } = useSession();

  if (!session) {
    return <LoginPage />
  }

  return <MainPage/>
}
