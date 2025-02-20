import {Metadata} from "next";
import {getI18n} from "@/locales/lib/server";
import {useSession} from "next-auth/react";
import LoginPage from "@/components/pages/LoginPage";
import MainPage from "@/components/pages/MainPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
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
