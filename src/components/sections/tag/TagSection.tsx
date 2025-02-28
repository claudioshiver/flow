import {ChevronLeft} from "lucide-react";
import * as React from "react";
import {useCallback, useState} from "react";
import {v4 as uuid} from "uuid";
import Section from "@/components/commons/Section";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import {useAppContext} from "@/components/providers/AppProvider";
import {Button} from "@/components/ui/button";
import usePutNote from "@/lib/hooks/notes/usePutNote";
import NotesArea from "@/components/commons/NotesArea";
import NoteEditDialog from "@/components/commons/NoteEditDialog";
import NoteRemoveDialog from "@/components/commons/NoteRemoveDialog";
import NoteMoveDialog from "@/components/commons/NoteMoveDialog";

const TagSection = () => {
  const {tag, setTag} = useAppContext();
  const {data: notes} = useGetNotes({tag})

  const {trigger: putNote} = usePutNote();

  const [content, setContent] = useState("")

  const handleSendMessage = useCallback(async () => {
    if (content) {
      await putNote({
        noteId: uuid(),
        content: content,
        tags: [tag],
      });

      setContent("")
    }
  }, [content, putNote, tag]);

  return (
    <Section
      title={tag || ''}
      before={
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setTag()}>
          <ChevronLeft className="h-4 w-4"/>
        </Button>
      }>
      {tag && (
        <NotesArea
          category="tag"
          notes={notes}
          content={content}
          setContent={setContent}
          onSend={handleSendMessage}/>
      )}

      <NoteEditDialog />
      <NoteRemoveDialog />
      <NoteMoveDialog />
    </Section>
);
}

export default TagSection;