'use client';

import {FormEvent, useCallback} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {TreeNodeFolder, TreeNodeItem} from "@/lib/types/Tree";
import usePutTags from "@/lib/hooks/tags/usePutTags";
import usePutLyrics from "@/lib/hooks/lyrics/usePutLyrics";

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

  const removeItemAndChildren = useCallback(<T extends "lyric" | "tag">(
    items: TreeNodeItem<T>[],
    id: string,
  ) => {
    const searchAndRemove = (nodes: TreeNodeItem<T>[]): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
          nodes.splice(i, 1);
          return true;
        }
        if (('items' in nodes[i]) && (nodes[i] as TreeNodeFolder<T>).items) {
          const removed = searchAndRemove((nodes[i] as TreeNodeFolder<T>).items!);
          if (removed) return true;
        }
      }
      return false;
    }

    return searchAndRemove(items);
  }, []);

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
  }, [type, id, lyrics, tags]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <p>{t('description')}</p>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RemoveDialog;