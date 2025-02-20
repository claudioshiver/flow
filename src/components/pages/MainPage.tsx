'use client';

import {useI18n} from "@/locales/lib/client";

const MainPage = () => {
  const t = useI18n();

  return (
    <div>
      <h1 className="mb-8">Flow</h1>
      <div>{t('description')}</div>
    </div>
  );
}

export default MainPage;