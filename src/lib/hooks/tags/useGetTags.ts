import useSWR from 'swr';
import {TreeNodeItem} from "@/lib/types/Tree";

const useGetTags = function() {
  return useSWR(
    'tags.get',
    async () => {
      const response = await fetch('/api/tags');

      if (!response.ok) {
        throw await response.json();
      }

      return await response.json() as Promise<TreeNodeItem<'tag'>[]>;
    })
}

export default useGetTags;
