import useSWR from 'swr';
import {TreeNodeItem} from "@/lib/types/Tree";

const useGetTags = function() {
  return useSWR(
    'tags.get',
    async () => {
      const response = await fetch('/api/tags');
      return await response.json() as Promise<TreeNodeItem<'tag'>[]>;
    })
}

export default useGetTags;
