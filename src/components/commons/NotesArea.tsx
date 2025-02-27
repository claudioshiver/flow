'use client';

import {Badge} from "@/components/ui/badge";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {SendHorizontal} from "lucide-react";
import * as React from "react";
import {Note} from "@/lib/types/Note";
import {useEffect, useRef} from "react";

type NotesAreaProps = {
  notes?: Note[];
  content: string;
  setContent: (content: string) => void;
  onSend: () => void;
}

const NotesArea = ({notes, content, setContent, onSend}: NotesAreaProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "instant" });
  }, [notes]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {notes?.map((note, index) => (
          <div key={index} className="bg-muted py-2 px-4 rounded flex flex-col gap-3">
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