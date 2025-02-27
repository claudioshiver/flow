import {useSWRConfig} from 'swr';
import useSWRMutation from "swr/mutation";
import {LyricsSchemaType} from "@/app/api/lyrics/schema";
import {invalidateTags} from "@/lib/utils/api";

const usePutLyrics = function() {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    'lyrics.put',
    async (_, { arg: body }: { arg: LyricsSchemaType }) => {
      const response = await fetch('/api/lyrics', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw await response.json();
      }
    }, {
      onSuccess: () => {
        mutate(
          invalidateTags([
            'lyrics.get',
          ])
        );
      }
    });
}

export default usePutLyrics;
