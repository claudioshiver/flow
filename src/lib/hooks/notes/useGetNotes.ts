import useSWR from 'swr';
import {Note} from "@/lib/types/Note";

const useGetNotes = function (
  params: { tag?: string, lyricId?: string }
) {
  return useSWR(
    params.lyricId
      ? ['notes.get', params.lyricId]
      : params.tag
        ? ['notes.get', params.tag]
        : null,
    async () => {
      const search = new URLSearchParams();
      if (params.tag) search.set('tag', params.tag);
      if (params.lyricId) search.set('lyricId', params.lyricId);

      const response = await fetch(`/api/notes?${search.toString()}`);

      if (!response.ok) {
        throw await response.json();
      }

      return await response.json() as Promise<Note[]>;
    })
}

export default useGetNotes;
