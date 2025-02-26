'use client';

import {signIn} from "next-auth/react";
import {useScopedI18n} from "@/locales/lib/client";

export default function LoginPage() {
  const t = useScopedI18n('pages.login');

  return (
    <div>
      <h1 className="mb-8">{t('title')}</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white px-4 py-2 rounded">
          {t('buttons.google')}
        </button>
      </div>
    </div>
  );
}