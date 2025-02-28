'use client';

import {SendHorizontal} from "lucide-react";
import * as React from "react";
import {useEffect, useRef} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import NoteItem from "@/components/commons/NoteItem";
import {Note} from "@/lib/types/Note";

type NotesAreaProps = {
  notes?: Note[];
  content: string;
  setContent: (content: string) => void;
  onSend: () => void;
  category: 'lyric' | 'tag';
}

const NotesArea = ({notes, category, content, setContent, onSend}: NotesAreaProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "instant"});
  }, [notes]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {notes?.map((note, index) => (
          <NoteItem
            key={index}
            note={note}
            category={category}/>
        ))}
        <div ref={endRef}/>
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