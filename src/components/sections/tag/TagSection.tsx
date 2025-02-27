import Section from "@/components/commons/Section";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import {useAppContext} from "@/components/providers/AppProvider";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";

const TagSection = () => {
  const {tag, setTag} = useAppContext();
  const {data: notes} = useGetNotes({tag})

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
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </Section>
  );
}

export default TagSection;