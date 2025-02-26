'use client';

import {signIn} from "next-auth/react";
import {useScopedI18n} from "@/locales/lib/client";
import {APP_NAME} from "@/lib/constants";

export default function LoginPage() {
  const t = useScopedI18n('pages.login');

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">
          {t('title', {name: APP_NAME})}
        </h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => signIn("google")}
            className="bg-red-500 text-white px-4 py-2 rounded">
            {t('buttons.google')}
          </button>
        </div>
      </div>
    </div>
  );
}