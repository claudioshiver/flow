'use client';

import {useI18n} from "@/locales/lib/client";
import {useSession} from "next-auth/react";
import {APP_NAME} from "@/lib/constants";
import useGetTags from "@/lib/hooks/useGetTags";

const MainPage = () => {
  const t = useI18n();
  const {data: session} = useSession();
  const {data: tags} = useGetTags();

  return (
    <div>
      <h1 className="mb-8">{APP_NAME}</h1>
      <div>{t('description')}</div>
      <pre className="max-w-full">{JSON.stringify(session, null, 2)}</pre>
      <pre className="max-w-full">{JSON.stringify(tags, null, 2)}</pre>
    </div>
  );
}

export default MainPage;