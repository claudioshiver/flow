import useSWR from 'swr';
import {TreeNodeItem} from "@/lib/types/Tree";

const useGetLyrics = function() {
  return useSWR(
    'lyrics.get',
    async () => {
      const response = await fetch('/api/lyrics');

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody);
      }

      return await response.json() as Promise<TreeNodeItem<'lyric'>[]>;
    })
}

export default useGetLyrics;
