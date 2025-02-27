import useSWR from 'swr';
import {TreeNodeItem} from "@/lib/types/Tree";

const useGetLyrics = function() {
  return useSWR(
    'lyrics.get',
    async () => {
      const response = await fetch('/api/lyrics');
      return await response.json() as Promise<TreeNodeItem<'lyric'>[]>;
    })
}

export default useGetLyrics;
