import {useSWRConfig} from 'swr';
import useSWRMutation from "swr/mutation";
import {TagsSchemaType} from "@/app/api/tags/schema";
import {invalidateTags} from "@/lib/utils/api";

const usePutTags = function() {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    'tags.put',
    async (_, { arg: body }: { arg: TagsSchemaType }) => {
      const response = await fetch('/api/tags', {
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
            'tags.get',
          ])
        );
      },
    });
}

export default usePutTags;
