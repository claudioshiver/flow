'use client';

import {FormEvent, useCallback, useMemo} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import {flattenTree, moveNode} from "@/lib/utils/tree";
import {useTreeContext} from "@/components/providers/TreeProvider";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {SingleSelect} from "@/components/ui/single-select";
import usePutTags from "@/lib/hooks/tags/usePutTags";
import usePutLyrics from "@/lib/hooks/lyrics/usePutLyrics";

const MoveDialog = () => {
  const {data: tags} = useGetTags();
  const {data: lyrics} = useGetLyrics();

  const {trigger: updateTags} = usePutTags();
  const {trigger: updateLyrics} = usePutLyrics();

  const {movingItem, setMovingItem} = useTreeContext();

  const t = useScopedI18n('pages.main.dialogs.move');
  const tc = useScopedI18n('pages.main.tree');

  const onOpenChange = useCallback((open: boolean) => {
    !open && setMovingItem(null)
  }, [setMovingItem]);

  const foldersOptions = useMemo(() => {
    const items = movingItem?.category === 'lyric' ? lyrics : tags;
    const label = movingItem?.category === 'lyric' ? tc('lyrics') : tc('tags');
    return [{label, value: ' '}, ...flattenTree(items || [], 'folder')]
  }, [movingItem?.category, lyrics, tags, tc])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (movingItem?.category! === 'lyric') {
      const clone = JSON.parse(JSON.stringify(lyrics));
      moveNode(clone, movingItem?.item?.id!, movingItem?.parentId!);
      await updateLyrics(clone);
    } else if (movingItem?.category! === 'tag') {
      const clone = JSON.parse(JSON.stringify(tags));
      moveNode(clone, movingItem?.item?.id!, movingItem?.parentId!);
      await updateTags(clone);
    }

    setMovingItem(null)
  }, [lyrics, movingItem, setMovingItem, tags, updateLyrics, updateTags]);

  const handleFolder = useCallback((value: string) => {
    setMovingItem({
      ...movingItem!,
      parentId: value.trim() || null,
    })
  }, [movingItem, setMovingItem]);

  return (
    <Dialog open={!!movingItem} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="tags">{t('folder')}</Label>
            <SingleSelect
              value={movingItem?.parentId || ' '}
              onChange={handleFolder}
              options={foldersOptions}/>
          </div>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default MoveDialog;