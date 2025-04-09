'use client';

import * as React from "react";
import {useMemo} from "react";
import cn from "classnames";
import TreeSection from "@/components/sections/tree/TreeSection";
import TagSection from "@/components/sections/notes/TagSection";
import LyricSection from "@/components/sections/notes/LyricSection";
import {useAppContext} from "@/components/providers/AppProvider";
import TreeProvider from "@/components/providers/TreeProvider";
import NotesProvider from "@/components/providers/NotesProvider";
import NoteEditDialog from "@/components/sections/notes/NoteEditDialog";
import NoteRemoveDialog from "@/components/sections/notes/NoteRemoveDialog";
import NoteMoveDialog from "@/components/sections/notes/NoteMoveDialog";

const MainPage = () => {
  const {tag, lyricId} = useAppContext();

  const treeClass = useMemo(() => (
    cn('h-[100dvh] col-span-12 lg:col-span-3 xl:col-span-2 lg:block lg:border-r', {
      'hidden': tag || lyricId
    })
  ), [tag, lyricId]);

  const tagClass = useMemo(() => (
    cn('h-[100dvh] col-span-12 lg:col-span-4 xl:col-span-4 lg:block lg:border-r', {
      'hidden': !tag
    })
  ), [tag]);

  const lyricClass = useMemo(() => (
    cn('h-[100dvh] col-span-12 lg:col-span-5 xl:col-span-6 lg:block', {
      'hidden': !lyricId
    })
  ), [lyricId]);

  return (
    <div className="h-full grid grid-cols-12">
      <TreeProvider>
        <div className={treeClass}>
          <TreeSection/>
        </div>
        <NotesProvider>
          <div className={tagClass}>
            <TagSection/>
          </div>
          <div className={lyricClass}>
            <LyricSection/>
          </div>

          <NoteEditDialog/>
          <NoteRemoveDialog/>
          <NoteMoveDialog/>
        </NotesProvider>
      </TreeProvider>
    </div>
  );
}

export default MainPage;