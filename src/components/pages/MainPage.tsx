'use client';

import {useMemo} from "react";
import cn from "classnames";
import TreeSection from "@/components/sections/tree/TreeSection";
import TagSection from "@/components/sections/tag/TagSection";
import LyricSection from "@/components/sections/lyric/LyricSection";
import {useAppContext} from "@/components/providers/AppProvider";

const MainPage = () => {
  const {tag, lyricId} = useAppContext();

  const treeClass = useMemo(() => (
    cn('col-span-6 lg:col-span-1 lg:block', {
      'hidden': tag || lyricId
    })
  ), [tag, lyricId]);

  const tagClass = useMemo(() => (
    cn('col-span-6 lg:col-span-2 lg:block', {
      'hidden': !tag
    })
  ), [tag]);

  const lyricClass = useMemo(() => (
    cn('col-span-6 lg:col-span-3 lg:block', {
      'hidden': !lyricId
    })
  ), [lyricId]);

  return (
    <div className="grid grid-cols-6">
      <div className={treeClass}>
        <TreeSection/>
      </div>
      <div className={tagClass}>
        <TagSection/>
      </div>
      <div className={lyricClass}>
        <LyricSection/>
      </div>
    </div>
  );
}

export default MainPage;