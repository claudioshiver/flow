import {ChevronLeft} from "lucide-react";
import * as React from "react";
import {useCallback, useMemo, useState} from "react";
import {v4 as uuid} from "uuid";
import {useAppContext} from "@/components/providers/AppProvider";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import Section from "@/components/commons/Section";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {searchItem} from "@/lib/utils/tree";
import {Button} from "@/components/ui/button";
import usePutNote from "@/lib/hooks/notes/usePutNote";
import NotesArea from "@/components/sections/notes/NotesArea";
import {getLyricOrder} from "@/lib/utils/notes";
import ScrollProvider from "@/components/providers/ScrollProvider";

const LyricSection = () => {
  const {lyricId, setLyricId} = useAppContext();
  const {data: lyrics} = useGetLyrics();
  const {data: notes} = useGetNotes({lyricId});

  const {trigger: putNote} = usePutNote();

  const [content, setContent] = useState("")

  const lyricOrder = useMemo(() => (
    getLyricOrder(notes || [])
  ), [notes])

  const handleSendMessage = useCallback(async () => {
    if (content) {
      await putNote({
        noteId: uuid(),
        content: content,
        lyricId,
        lyricOrder,
        tags: [],
      });

      setContent("")
    }
  }, [content, lyricId, lyricOrder, putNote]);

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
        <ScrollProvider>
          <NotesArea
            category="lyric"
            notes={notes}
            content={content}
            setContent={setContent}
            onSend={handleSendMessage}/>
        </ScrollProvider>
      )}
    </Section>
  );
}

export default LyricSection;