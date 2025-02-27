import {useSWRConfig} from 'swr';
import useSWRMutation from "swr/mutation";
import {NoteSchemaType} from "@/app/api/notes/schema";
import {invalidateTags} from "@/lib/utils/api";

const usePutNote = function() {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    'notes.put',
    async (_, { arg: body }: { arg: NoteSchemaType }) => {
      await fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    }, {
      onSuccess: () => {
        mutate(
          invalidateTags([
            'notes.get',
          ])
        );
      }
    });
}

export default usePutNote;
