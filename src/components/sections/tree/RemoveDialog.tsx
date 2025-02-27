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

type RemoveDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  id: string
  type: 'lyric' | 'tag'
}

const RemoveDialog = ({isOpen, onOpenChange, id, type}: RemoveDialogProps) => {
  const {data: tags} = useGetTags();
  const {data: lyrics} = useGetLyrics();

  const {trigger: updateTags} = usePutTags();
  const {trigger: updateLyrics} = usePutLyrics();

  const t = useScopedI18n('pages.main.dialogs.remove');

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (type === 'lyric') {
      const clone = JSON.parse(JSON.stringify(lyrics));
      removeItemAndChildren(clone, id);
      await updateLyrics(clone);
    } else if (type === 'tag') {
      const clone = JSON.parse(JSON.stringify(tags));
      removeItemAndChildren(clone, id);
      await updateTags(clone);
    }

    onOpenChange(false)
  }, [type, onOpenChange, lyrics, id, updateLyrics, tags, updateTags]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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

export default RemoveDialog;