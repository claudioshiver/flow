import {Badge} from "@/components/ui/badge";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {SendHorizontal} from "lucide-react";
import * as React from "react";
import {Note} from "@/lib/types/Note";

type NotesAreaProps = {
  notes?: Note[];
  content: string;
  setContent: (content: string) => void;
  onSend: () => void;
}

const NotesArea = ({notes, content, setContent, onSend}: NotesAreaProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {notes?.map((note, index) => (
          <div key={index} className="bg-muted p-2 rounded flex flex-col gap-2">
            <p>{note.content}</p>
            {note.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t pt-4 pb-2 flex space-x-2">
        <Textarea
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