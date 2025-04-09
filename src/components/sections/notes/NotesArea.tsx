'use client';

import {SendHorizontal} from "lucide-react";
import * as React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import NoteItem from "@/components/sections/notes/NoteItem";
import {Note} from "@/lib/types/Note";
import AutoScrollItem from "@/components/commons/AutoScrollItem";

type NotesAreaProps = {
  notes?: Note[];
  content: string;
  setContent: (content: string) => void;
  onSend: () => void;
  category: 'lyric' | 'tag';
}

const NotesArea = ({notes, category, content, setContent, onSend}: NotesAreaProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {notes?.map((note, index) => (
          <NoteItem
            key={index}
            index={index}
            last={index === notes.length - 1}
            note={note}
            category={category}/>
        ))}
        <AutoScrollItem notes={notes} />
      </div>
      <div className="border-t pt-4 pb-2 flex space-x-2">
        <Textarea
          className="h-[38px] -my-px"
          value={content}
          onChange={e => setContent(e.target.value)}/>
        <Button onClick={onSend}>
          <SendHorizontal className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
}

export default NotesArea;