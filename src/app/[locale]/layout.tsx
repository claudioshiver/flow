import {ReactNode} from "react";
import type {Metadata} from "next";
import {getI18n} from "@/locales/lib/server";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: "Flow",
    description: t('description'),
  }
}

export default async function MainLayout({children}: MainLayoutProps) {
  return children;
}
