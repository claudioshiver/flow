'use client';

import type {ReactNode} from 'react';
import {createContext, useContext, useMemo, useState} from 'react';

export type AppContextType = {
  tag?: string,
  lyricId?: string,
  setTag: (tag?: string) => void,
  setLyricId: (lyricId?: string) => void,
}

const AppContext = createContext<AppContextType>({
  tag: undefined,
  lyricId: undefined,
  setTag: () => undefined,
  setLyricId: () => undefined,
});

const AppProvider = function ({children}: { children: ReactNode }) {
  const [tag, setTag] = useState<string | undefined>();
  const [lyricId, setLyricId] = useState<string | undefined>();

  const context = useMemo(() => ({
    tag,
    lyricId,
    setTag,
    setLyricId,
  }), [tag, lyricId, setTag, setLyricId]);

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = function () {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within a AppProviderClient');
  return context;
}

export default AppProvider;
