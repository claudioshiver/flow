import useSWR from 'swr';
import {Note} from "@/lib/types/Note";

const useGetNotes = function (
  params: { tag?: string, lyricId?: string, search?: string }
) {
  return useSWR(
    params.search
      ? ['notes.search', params.search]
      : params.lyricId
        ? ['notes.get', params.lyricId]
        : params.tag
          ? ['notes.get', params.tag]
          : null,
    async () => {
      const search = new URLSearchParams();
      if (params.tag) search.set('tag', params.tag);
      if (params.lyricId) search.set('lyricId', params.lyricId);
      if (params.search) search.set('search', params.search);

      const response = await fetch(`/api/notes?${search.toString()}`);

      if (!response.ok) {
        throw await response.json();
      }

      return await response.json() as Promise<Note[]>;
    })
}

export default useGetNotes;
