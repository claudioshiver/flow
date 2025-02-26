'use client';

import {signIn} from "next-auth/react";
import {useScopedI18n} from "@/locales/lib/client";
import useGetTags from "@/lib/hooks/useGetTags";

export default function LoginPage() {
  const t = useScopedI18n('pages.login');
  const {data: tags} = useGetTags();

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">{t('title')}</h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => signIn("google")}
            className="bg-red-500 text-white px-4 py-2 rounded">
            {t('buttons.google')}
          </button>
        </div>
        <pre className="max-w-full">{JSON.stringify(tags || '{}', null, 2)}</pre>
      </div>
    </div>
  );
}