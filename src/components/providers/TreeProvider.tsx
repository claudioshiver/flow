'use client';

import type {ReactNode} from 'react';
import {createContext, useContext, useMemo, useState} from 'react';
import {TreeNodeItem} from "@/lib/types/Tree";

type EditingItem = {
  category: 'lyric' | 'tag'
  item: TreeNodeItem<'lyric' | 'tag'> | null
}

type MovingItem = EditingItem & {
  parentId: string | null
}

export type TreeContextType = {
  openItems: Record<string, boolean>
  setOpenItems: (openItems: Record<string, boolean>) => void
  isAddingNote: boolean
  setIsAddingNote: (isAddingNote: boolean) => void
  removingItem: EditingItem | null
  setRemovingItem: (removingItem: EditingItem | null) => void
  renamingItem: EditingItem | null
  setRenamingItem: (renamingItem: EditingItem | null) => void
  movingItem: MovingItem | null
  setMovingItem: (movingItem: MovingItem | null) => void
  addingItem: EditingItem | null
  setAddingItem: (addingItem: EditingItem | null) => void
}

const TreeContext = createContext<TreeContextType>({
  openItems: {},
  setOpenItems: () => undefined,
  isAddingNote: false,
  setIsAddingNote: () => undefined,
  removingItem: null,
  setRemovingItem: () => undefined,
  renamingItem: null,
  setRenamingItem: () => undefined,
  movingItem: null,
  setMovingItem: () => undefined,
  addingItem: null,
  setAddingItem: () => undefined,
});

const TreeProvider = function ({children}: { children: ReactNode }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isAddingNote, setIsAddingNote] = useState(false);

  const [renamingItem, setRenamingItem] = useState<EditingItem | null>(null);
  const [movingItem, setMovingItem] = useState<MovingItem | null>(null);
  const [removingItem, setRemovingItem] = useState<EditingItem | null>(null);
  const [addingItem, setAddingItem] = useState<EditingItem | null>(null);

  const context = useMemo(() => ({
    openItems,
    setOpenItems,
    isAddingNote,
    setIsAddingNote,
    removingItem,
    setRemovingItem,
    renamingItem,
    setRenamingItem,
    movingItem,
    setMovingItem,
    addingItem,
    setAddingItem,
  }), [openItems, isAddingNote, removingItem, renamingItem, movingItem, addingItem]);

  return (
    <TreeContext.Provider value={context}>
      {children}
    </TreeContext.Provider>
  );
}

export const useTreeContext = function () {
  const context = useContext(TreeContext);
  if (!context) throw new Error('useTreeContext must be used within a TreeProviderClient');
  return context;
}

export default TreeProvider;
