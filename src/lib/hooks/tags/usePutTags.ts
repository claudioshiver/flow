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
        const errorBody = await response.json();
        throw new Error(errorBody);
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
