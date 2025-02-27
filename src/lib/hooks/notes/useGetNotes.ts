import useSWR from 'swr';
import {Note} from "@/lib/types/Note";

const useGetNotes = function (
  params: { tag?: string, lyricId?: string }
) {
  return useSWR(
    params.tag
      ? ['notes.get', params.tag]
      : params.lyricId
        ? ['notes.get', params.lyricId]
        : null,
    async () => {
      const search = new URLSearchParams();
      if (params.tag) search.set('tag', params.tag);
      if (params.lyricId) search.set('lyricId', params.lyricId);

      const response = await fetch(`/api/notes?${search.toString()}`);

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody);
      }

      return await response.json() as Promise<Note[]>;
    })
}

export default useGetNotes;
