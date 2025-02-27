import {useMemo} from "react";
import {useAppContext} from "@/components/providers/AppProvider";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import Section from "@/components/commons/Section";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {searchItem} from "@/lib/utils/tree";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";

const LyricSection = () => {
  const {lyricId, setLyricId} = useAppContext();
  const {data: lyrics} = useGetLyrics();
  const {data: notes} = useGetNotes({lyricId});

  const lyricLabel = useMemo(() => (
    lyricId
      ? searchItem(lyrics || [], lyricId)?.label || ''
      : ''
  ), [lyrics, lyricId]);

  return (
    <Section
      title={lyricLabel}
      before={
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setLyricId()}>
          <ChevronLeft className="h-4 w-4"/>
        </Button>
      }>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </Section>
  );
}

export default LyricSection;