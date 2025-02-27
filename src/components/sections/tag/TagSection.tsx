import Section from "@/components/commons/Section";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import {useAppContext} from "@/components/providers/AppProvider";

const TagSection = () => {
  const {tag} = useAppContext();
  const {data: notes} = useGetNotes({tag})

  return (
    <Section title={tag || ''}>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </Section>
  );
}

export default TagSection;