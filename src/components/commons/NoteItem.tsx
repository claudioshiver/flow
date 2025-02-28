'use client';

import * as React from "react";
import {Badge} from "@/components/ui/badge";
import {Note} from "@/lib/types/Note";
import NoteDropdown from "@/components/commons/NoteDropdown";

type NoteItemProps = {
  note: Note;
  category: 'lyric' | 'tag';
}

const NoteItem = ({note, category}: NoteItemProps) => {
  return (
    <div className="bg-muted py-2 px-4 rounded flex gap-1">
      <div className="flex-1 flex flex-col gap-3">
        <pre className="whitespace-pre-wrap break-words text-sm font-sans font-normal">
          {note.content}
        </pre>
        {(note.tags?.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-white">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <NoteDropdown
        category={category}
        item={note} />
    </div>
  );
}

export default NoteItem;