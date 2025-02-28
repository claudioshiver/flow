'use client';

import type {ReactNode} from 'react';
import {createContext, useContext, useMemo} from 'react';
import {useSessionStorage} from "usehooks-ts";
import StoredVariable from "@/lib/enums/StoredVariable";

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
  const [tag, setTag] = useSessionStorage<string | undefined>(StoredVariable.SELECTED_TAG, undefined);
  const [lyricId, setLyricId] = useSessionStorage<string | undefined>(StoredVariable.SELECTED_LYRIC_ID, undefined);

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
