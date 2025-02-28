'use client';

import {FormEvent, useCallback, useMemo} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import {flattenTree} from "@/lib/utils/tree";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {SingleSelect} from "@/components/ui/single-select";
import {useNotesContext} from "@/components/providers/NotesProvider";
import usePutNote from "@/lib/hooks/notes/usePutNote";

const NoteMoveDialog = () => {
  const {data: lyrics} = useGetLyrics();

  const {trigger: putNode} = usePutNote();

  const {movingItem, setMovingItem} = useNotesContext();

  const t = useScopedI18n('pages.main.dialogs.move');

  const onOpenChange = useCallback((open: boolean) => {
    !open && setMovingItem(null)
  }, [setMovingItem]);

  const lyricsOptions = useMemo(() => [
    {label: t('empty'), value: ' '},
    ...flattenTree(lyrics || [], 'leaf')
  ], [t, lyrics])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    await putNode(movingItem?.item!);
    setMovingItem(null)
  }, [movingItem, putNode, setMovingItem]);

  const handleLyric = useCallback((value: string) => {
    setMovingItem({
      ...movingItem!,
      item: {
        ...movingItem?.item!,
        lyricId: value.trim() || undefined
      },
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
            <Label htmlFor="tags">{t('lyric')}</Label>
            <SingleSelect
              value={movingItem?.item?.lyricId || ' '}
              onChange={handleLyric}
              options={lyricsOptions}/>
          </div>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NoteMoveDialog;