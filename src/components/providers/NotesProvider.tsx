'use client';

import type {ReactNode} from 'react';
import {createContext, useContext, useMemo, useState} from 'react';
import {Note} from "@/lib/types/Note";

type EditingItem = {
  category: 'lyric' | 'tag'
  item: Note | null
}

export type NotesContextType = {
  removingItem: EditingItem | null
  setRemovingItem: (removingItem: EditingItem | null) => void
  movingItem: EditingItem | null
  setMovingItem: (movingItem: EditingItem | null) => void
  editingItem: EditingItem | null
  setEditingItem: (addingItem: EditingItem | null) => void
}

const NotesContext = createContext<NotesContextType>({
  removingItem: null,
  setRemovingItem: () => undefined,
  movingItem: null,
  setMovingItem: () => undefined,
  editingItem: null,
  setEditingItem: () => undefined,
});

const NotesProvider = function ({children}: { children: ReactNode }) {
  const [removingItem, setRemovingItem] = useState<EditingItem | null>(null);
  const [movingItem, setMovingItem] = useState<EditingItem | null>(null);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  const context = useMemo(() => ({
    removingItem,
    setRemovingItem,
    movingItem,
    setMovingItem,
    editingItem,
    setEditingItem,
  }), [removingItem, editingItem, movingItem]);

  return (
    <NotesContext.Provider value={context}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotesContext = function () {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotesContext must be used within a TreeProviderClient');
  return context;
}

export default NotesProvider;
