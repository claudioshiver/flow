import {useAppContext} from "@/components/providers/AppProvider";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import Section from "@/components/commons/Section";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {useMemo} from "react";
import {TreeNodeItem} from "@/lib/types/Tree";

const LyricSection = () => {
  const {lyricId} = useAppContext();
  const {data: lyrics} = useGetLyrics();
  const {data: notes} = useGetNotes({lyricId});

  const lyricLabel = useMemo(() => {
    const search = (nodes: TreeNodeItem<'lyric'>[]): string | undefined => {
      for (const node of nodes) {
        if (node.id === lyricId) {
          return node.label;
        }
        if ('items' in node && node.items) {
          const found = search(node.items);
          if (found) return found;
        }
      }

      return undefined;
    }

    return search(lyrics || []);
  }, [lyrics, lyricId]);

  return (
    <Section title={lyricLabel || ''}>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </Section>
  );
}

export default LyricSection;