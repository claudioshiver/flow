import {useSWRConfig} from 'swr';
import useSWRMutation from "swr/mutation";
import {invalidateTags} from "@/lib/utils/api";

const useDeleteNote = function () {
  const {mutate} = useSWRConfig();

  return useSWRMutation(
    'notes.delete',
    async (_, {arg: noteId}: { arg: string }) => {
      const response = await fetch(`/api/notes?id=${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw await response.json();
      }
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
