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
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import {getLyricOrder} from "@/lib/utils/notes";

const NoteMoveDialog = () => {
  const {data: lyrics} = useGetLyrics();

  const {trigger: putNode} = usePutNote();

  const {movingItem, setMovingItem} = useNotesContext();

  const {data: notes} = useGetNotes({lyricId: movingItem?.item?.lyricId});

  const t = useScopedI18n('pages.main.notes.dialogs.move');

  const lyricOrder = useMemo(() => (
    getLyricOrder(notes || [])
  ), [notes])

  const onOpenChange = useCallback((open: boolean) => {
    !open && setMovingItem(null)
  }, [setMovingItem]);

  const lyricsOptions = useMemo(() => [
    {label: t('empty'), value: ' '},
    ...flattenTree(lyrics || [], 'leaf')
  ], [t, lyrics])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    await putNode({
      ...movingItem?.item!,
      lyricOrder: movingItem?.item?.lyricId
        ? lyricOrder
        : undefined
    });

    setMovingItem(null)
  }, [putNode, movingItem, lyricOrder, setMovingItem]);

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
          <Button type="submit">
            {t('submit')} ({lyricOrder})
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NoteMoveDialog;