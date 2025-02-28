'use client';

import {useMemo} from "react";
import cn from "classnames";
import TreeSection from "@/components/sections/tree/TreeSection";
import TagSection from "@/components/sections/tag/TagSection";
import LyricSection from "@/components/sections/lyric/LyricSection";
import {useAppContext} from "@/components/providers/AppProvider";
import TreeProvider from "@/components/providers/TreeProvider";
import NotesProvider from "@/components/providers/NotesProvider";
import NoteEditDialog from "@/components/commons/NoteEditDialog";
import NoteRemoveDialog from "@/components/commons/NoteRemoveDialog";
import NoteMoveDialog from "@/components/commons/NoteMoveDialog";
import * as React from "react";

const MainPage = () => {
  const {tag, lyricId} = useAppContext();

  const treeClass = useMemo(() => (
    cn('h-screen col-span-6 lg:col-span-2 xl:col-span-1 lg:block lg:border-r', {
      'hidden': tag || lyricId
    })
  ), [tag, lyricId]);

  const tagClass = useMemo(() => (
    cn('h-screen col-span-6 lg:col-span-2 xl:col-span-2 lg:block lg:border-r', {
      'hidden': !tag
    })
  ), [tag]);

  const lyricClass = useMemo(() => (
    cn('h-screen col-span-6 lg:col-span-2 xl:col-span-3 lg:block', {
      'hidden': !lyricId
    })
  ), [lyricId]);

  return (
    <div className="grid grid-cols-6">
      <div className={treeClass}>
        <TreeProvider>
          <TreeSection/>
        </TreeProvider>
      </div>
      <NotesProvider>
        <div className={tagClass}>
          <TagSection/>
        </div>
        <div className={lyricClass}>
          <LyricSection/>
        </div>

        <NoteEditDialog />
        <NoteRemoveDialog />
        <NoteMoveDialog />
      </NotesProvider>
    </div>
  );
}

export default MainPage;