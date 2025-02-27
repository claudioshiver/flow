import {useSWRConfig} from 'swr';
import useSWRMutation from "swr/mutation";
import {NoteSchemaType} from "@/app/api/notes/schema";
import {invalidateTags} from "@/lib/utils/api";

const useDeleteNote = function() {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    'notes.delete',
    async (_, { arg: noteId }: { arg: string }) => {
      await fetch(`/api/notes?id=${noteId}`, {
        method: 'DELETE',
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

export default useDeleteNote;
