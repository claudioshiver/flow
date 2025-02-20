'use client';

import {SessionProvider} from "next-auth/react";
import {MainTemplate} from "@/components/pages/MainTemplate";

export default function AppPage() {
  return (
    <SessionProvider>
      <MainTemplate/>
    </SessionProvider>
  );
}
