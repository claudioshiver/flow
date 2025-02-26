'use client';

import {SessionProvider} from "next-auth/react";
import {MainTemplate} from "@/components/pages/MainTemplate";
import AlertMessages from "@/components/commons/AlertMessages";

export default function AppPage() {
  return (
    <SessionProvider>
      <MainTemplate/>
      <AlertMessages/>
    </SessionProvider>
  );
}
