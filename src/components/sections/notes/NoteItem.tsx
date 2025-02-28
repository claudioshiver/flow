'use client';

import * as React from "react";
import {Badge} from "@/components/ui/badge";
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
    <div className="bg-muted py-2 px-4 rounded flex flex-col gap-2">
      <div className="flex gap-2">
        <pre className="flex-1 whitespace-pre-wrap break-words text-sm font-sans font-normal">
          {note.content}
        </pre>
        <NoteDropdown
          index={index}
          last={last}
          category={category}
          item={note}/>
      </div>
      {(note.tags?.length > 0) && (
        <div className="flex flex-wrap justify-end items-center gap-1">
          {note.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-white">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteItem;