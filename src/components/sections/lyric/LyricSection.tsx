import {useMemo} from "react";
import {useAppContext} from "@/components/providers/AppProvider";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import Section from "@/components/commons/Section";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {searchItem} from "@/lib/utils/tree";

const LyricSection = () => {
  const {lyricId} = useAppContext();
  const {data: lyrics} = useGetLyrics();
  const {data: notes} = useGetNotes({lyricId});

  const lyricLabel = useMemo(() => (
    lyricId
      ? searchItem(lyrics || [], lyricId)?.label || ''
      : ''
  ), [lyrics, lyricId]);

  return (
    <Section title={lyricLabel}>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </Section>
  );
}

export default LyricSection;