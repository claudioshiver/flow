'use client';

import {useI18n} from "@/locales/lib/client";
import {useSession} from "next-auth/react";

const MainPage = () => {
  const t = useI18n();
  const {data: session} = useSession();

  return (
    <div>
      <h1 className="mb-8">Flow</h1>
      <div>{t('description')}</div>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}

export default MainPage;