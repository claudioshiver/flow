'use client';

import * as React from "react";
import {Note} from "@/lib/types/Note";
import NoteDropdown from "@/components/sections/notes/NoteDropdown";
import {Star} from "lucide-react";
import {MAX_RATE} from "@/lib/constants";
import {useMemo} from "react";

type NoteItemProps = {
  note: Note;
  index?: number;
  last?: boolean;
  highlight?: string;
  category?: 'lyric' | 'tag';
}

const NoteItem = ({note, category, index, last, highlight}: NoteItemProps) => {
  const highlighted = useMemo(() => (
    highlight
      ? note.content.split(highlight).join(`<strong>${highlight}</strong>`)
      : note.content
  ), [note.content, highlight]);

  const content = useMemo(() => (
    highlighted.replaceAll('\n', '<br/>')
  ), [highlighted]);

  return (
    <div className="bg-muted py-1 px-2 rounded flex flex-col gap-1">
      <div className="flex gap-2">
        <div
          dangerouslySetInnerHTML={{__html: content}}
          className="flex-1 whitespace-pre-wrap break-words text-xs font-sans font-normal" />
        {category && (
          <NoteDropdown
            index={index ?? 0}
            last={last ?? false}
            category={category}
            item={note}/>
        )}
      </div>
      <div
        className="flex flex-wrap justify-end items-center gap-2 text-[0.65rem] leading-[0.7rem] text-gray-400 font-semibold">
        {note.tags?.map((tag, index) => (
          <div key={index}>{tag}</div>
        ))}
        <div className="inline-flex items-center gap-0.5">
          {Array.from({length: MAX_RATE}).map((tag, index) => (
            <Star key={index} size={10} fill={index < note.rate ? 'currentColor' : 'none'}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;