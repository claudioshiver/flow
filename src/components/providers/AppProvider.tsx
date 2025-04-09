'use client';

import type {ReactNode} from 'react';
import {createContext, useContext, useMemo} from 'react';
import useQueryParams from "@/lib/hooks/query/useQueryParams";
import QueryVariable from "@/lib/enums/QueryVariable";
import {StringType} from "@/lib/hooks/query/types";

export type AppContextType = {
  tag?: string,
  lyricId?: string,
  noteId?: string,
  setTag: (tag?: string) => void,
  setLyricId: (lyricId?: string) => void,
  setTagNoteId: (tag?: string, noteId?: string) => void,
  setLyricNoteId: (lyricId?: string, noteId?: string) => void,
}

const AppContext = createContext<AppContextType>({
  tag: undefined,
  lyricId: undefined,
  noteId: undefined,
  setTag: () => undefined,
  setLyricId: () => undefined,
  setTagNoteId: () => undefined,
  setLyricNoteId: () => undefined,
});

const AppProvider = function ({children}: { children: ReactNode }) {
  const {
    query,
    setQuery,
  } = useQueryParams({
    [QueryVariable.SELECTED_TAG]: new StringType(),
    [QueryVariable.SELECTED_LYRIC_ID]: new StringType(),
    [QueryVariable.SELECTED_NOTE_ID]: new StringType(),
  })

  const context = useMemo(() => ({
    tag: query[QueryVariable.SELECTED_TAG],
    lyricId: query[QueryVariable.SELECTED_LYRIC_ID],
    noteId: query[QueryVariable.SELECTED_NOTE_ID],
    setTag: (tag?: string) => setQuery({
      [QueryVariable.SELECTED_NOTE_ID]: null,
      [QueryVariable.SELECTED_TAG]: tag
    }),
    setLyricId: (lyricId?: string) => setQuery({
      [QueryVariable.SELECTED_NOTE_ID]: null,
      [QueryVariable.SELECTED_LYRIC_ID]: lyricId
    }),
    setTagNoteId: (tag?: string, noteId?: string) => setQuery({
      [QueryVariable.SELECTED_NOTE_ID]: noteId,
      [QueryVariable.SELECTED_TAG]: tag
    }),
    setLyricNoteId: (lyricId?: string, noteId?: string) => setQuery({
      [QueryVariable.SELECTED_NOTE_ID]: noteId,
      [QueryVariable.SELECTED_LYRIC_ID]: lyricId
    }),
  }), [query, setQuery]);

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
