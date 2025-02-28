'use client';

import {ChangeEvent, FormEvent, useCallback, useMemo} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import usePutNote from "@/lib/hooks/notes/usePutNote";
import {Textarea} from "@/components/ui/textarea";
import {MultiSelect} from "@/components/ui/multi-select";
import {flattenTree} from "@/lib/utils/tree";
import {useNotesContext} from "@/components/providers/NotesProvider";

const NoteEditDialog = () => {
  const {data: tags} = useGetTags();
  const {trigger: putNote} = usePutNote();

  const {editingItem, setEditingItem} = useNotesContext();

  const t = useScopedI18n('pages.main.notes.dialogs.edit');

  const tagsOptions = useMemo(() => (
    flattenTree(tags || [], 'leaf')
  ), [tags])

  const onOpenChange = useCallback((open: boolean) => {
    !open && setEditingItem(null)
  }, [setEditingItem]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (editingItem?.item?.content) {
      await putNote(editingItem?.item);
      setEditingItem(null)
    }
  }, [editingItem, putNote, setEditingItem]);

  const handleTags = useCallback((value: string[]) => {
    setEditingItem({
      ...editingItem!,
      item: {
        ...editingItem?.item!,
        tags: value
      }
    })
  }, [editingItem, setEditingItem]);

  const handleContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditingItem({
      ...editingItem!,
      item: {
        ...editingItem?.item!,
        content: e.target.value
      }
    })
  }, [editingItem, setEditingItem]);

  return (
    <Dialog open={!!editingItem} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="content">{t('content')}</Label>
            <Textarea
              autoFocus
              id="content"
              name="content"
              autoComplete="off"
              className="min-h-[60px]"
              value={editingItem?.item?.content || ''}
              onChange={handleContent}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">{t('tags')}</Label>
            <MultiSelect
              placeholder={t('placeholder')}
              searchPlaceholder={t('searchPlaceholder')}
              emptyMessage={t('emptyMessage')}
              selected={editingItem?.item?.tags || []}
              onChange={handleTags}
              options={tagsOptions}/>
          </div>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NoteEditDialog;