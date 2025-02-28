'use client';

import * as React from "react";
import {Note} from "@/lib/types/Note";
import NoteDropdown from "@/components/sections/notes/NoteDropdown";

type NoteItemProps = {
  note: Note;
  index: number;
  last: boolean;
  category: 'lyric' | 'tag';
}

const NoteItem = ({note, category, index, last}: NoteItemProps) => {
  return (
    <div className="bg-muted py-1 px-2 rounded flex flex-col gap-1">
      <div className="flex gap-2">
        <pre className="flex-1 whitespace-pre-wrap break-words text-xs font-sans font-normal">
          {note.content}
        </pre>
        <NoteDropdown
          index={index}
          last={last}
          category={category}
          item={note}/>
      </div>
      {(note.tags?.length > 0) && (
        <div className="flex flex-wrap justify-end items-center gap-2">
          {note.tags.map((tag, index) => (
            <div
              key={index}
              className="text-[0.65rem] leading-[0.7rem] font-semibold focus:outline-none">
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteItem;