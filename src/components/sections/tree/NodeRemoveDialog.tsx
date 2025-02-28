'use client';

import {FormEvent, useCallback} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import usePutTags from "@/lib/hooks/tags/usePutTags";
import usePutLyrics from "@/lib/hooks/lyrics/usePutLyrics";
import {removeItemAndChildren} from "@/lib/utils/tree";
import {useTreeContext} from "@/components/providers/TreeProvider";

const NodeRemoveDialog = () => {
  const {data: tags} = useGetTags();
  const {data: lyrics} = useGetLyrics();

  const {trigger: updateTags} = usePutTags();
  const {trigger: updateLyrics} = usePutLyrics();

  const {removingItem, setRemovingItem} = useTreeContext();

  const t = useScopedI18n('pages.main.tree.dialogs.remove');

  const onOpenChange = useCallback((open: boolean) => {
    !open && setRemovingItem(null)
  }, [setRemovingItem]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (removingItem?.category === 'lyric') {
      const clone = JSON.parse(JSON.stringify(lyrics));
      removeItemAndChildren(clone, removingItem?.item?.id!);
      await updateLyrics(clone);
    } else if (removingItem?.category === 'tag') {
      const clone = JSON.parse(JSON.stringify(tags));
      removeItemAndChildren(clone, removingItem?.item?.id!);
      await updateTags(clone);
    }

    onOpenChange(false)
  }, [removingItem, onOpenChange, lyrics, updateLyrics, tags, updateTags]);

  return (
    <Dialog open={!!removingItem} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
          <p>{t('description')}</p>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NodeRemoveDialog;