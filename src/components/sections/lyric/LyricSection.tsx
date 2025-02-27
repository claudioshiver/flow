import {ChevronLeft} from "lucide-react";
import {useCallback, useMemo, useState} from "react";
import {v4 as uuid} from "uuid";
import {useAppContext} from "@/components/providers/AppProvider";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import Section from "@/components/commons/Section";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {searchItem} from "@/lib/utils/tree";
import {Button} from "@/components/ui/button";
import usePutNote from "@/lib/hooks/notes/usePutNote";
import NotesArea from "@/components/commons/NotesArea";
import * as React from "react";

const LyricSection = () => {
  const {lyricId, setLyricId} = useAppContext();
  const {data: lyrics} = useGetLyrics();
  const {data: notes} = useGetNotes({lyricId});

  const {trigger: putNote} = usePutNote();

  const [content, setContent] = useState("")

  const handleSendMessage = useCallback(async () => {
    if (content) {
      await putNote({
        noteId: uuid(),
        content: content,
        lyricId,
        lyricOrder: notes?.length || 0,
        tags: [],
      });

      setContent("")
    }
  }, [content, lyricId, notes, putNote]);

  const lyric = useMemo(() => (
    lyricId ? searchItem(lyrics || [], lyricId) : undefined
  ), [lyrics, lyricId]);

  return (
    <Section
      title={lyric?.label || ''}
      before={
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setLyricId()}>
          <ChevronLeft className="h-4 w-4"/>
        </Button>
      }>
      {lyricId && (
        <NotesArea
          notes={notes}
          content={content}
          setContent={setContent}
          onSend={handleSendMessage}/>
      )}
    </Section>
  );
}

export default LyricSection;