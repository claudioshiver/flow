'use client';

import {ChangeEvent, FormEvent, useCallback} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import usePutTags from "@/lib/hooks/tags/usePutTags";
import usePutLyrics from "@/lib/hooks/lyrics/usePutLyrics";
import {renameItem} from "@/lib/utils/tree";
import {useTreeContext} from "@/components/providers/TreeProvider";

const NodeRenameDialog = () => {
  const {data: tags} = useGetTags();
  const {data: lyrics} = useGetLyrics();

  const {trigger: updateTags} = usePutTags();
  const {trigger: updateLyrics} = usePutLyrics();

  const {renamingItem, setRenamingItem} = useTreeContext();

  const t = useScopedI18n('pages.main.tree.dialogs.rename');

  const onOpenChange = useCallback((open: boolean) => {
    !open && setRenamingItem(null)
  }, [setRenamingItem]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (renamingItem?.item?.label) {
      if (renamingItem?.category! === 'lyric') {
        const clone = JSON.parse(JSON.stringify(lyrics));
        renameItem(clone, renamingItem?.item);
        await updateLyrics(clone);
      } else if (renamingItem?.category! === 'tag') {
        const clone = JSON.parse(JSON.stringify(tags));
        renameItem(clone, renamingItem?.item);
        await updateTags(clone);
      }

      setRenamingItem(null)
    }
  }, [renamingItem, setRenamingItem, lyrics, updateLyrics, tags, updateTags]);

  const handleName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRenamingItem({
      ...renamingItem!,
      item: {
        ...renamingItem?.item!,
        label: (renamingItem?.category !== 'tag' || renamingItem?.item?.type === 'folder')
          ? e.target.value
          : String(e.target.value).trim().toLowerCase().replace(/[^a-z0-9]/g, '')
      }
    })
  }, [renamingItem, setRenamingItem]);

  return (
    <Dialog open={!!renamingItem} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="label">{t('label')}</Label>
            <Input
              autoFocus
              id="label"
              name="label"
              autoComplete="off"
              value={renamingItem?.item?.label || ''}
              onChange={handleName}/>
          </div>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NodeRenameDialog;