'use client';

import {useI18n} from "@/locales/lib/client";
import {useSession} from "next-auth/react";
import {APP_NAME} from "@/lib/constants";

const MainPage = () => {
  const t = useI18n();
  const {data: session} = useSession();

  return (
    <div>
      <h1 className="mb-8">{APP_NAME}</h1>
      <div>{t('description')}</div>
      <pre className="max-w-full">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default MainPage;