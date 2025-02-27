import {useSWRConfig} from 'swr';
import useSWRMutation from "swr/mutation";
import {TagsSchemaType} from "@/app/api/tags/schema";
import {invalidateTags} from "@/lib/utils/api";

const usePutTags = function() {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    'tags.put',
    async (_, { arg: body }: { arg: TagsSchemaType }) => {
      await fetch('/api/tags', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    }, {
      onSuccess: () => {
        mutate(
          invalidateTags([
            'tags.get',
          ])
        );
      }
    });
}

export default usePutTags;
