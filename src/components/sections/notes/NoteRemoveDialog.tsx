'use client';

import {FormEvent, useCallback} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import {useNotesContext} from "@/components/providers/NotesProvider";
import useDeleteNote from "@/lib/hooks/notes/useDeleteNote";

const NoteRemoveDialog = () => {
  const {trigger: deleteNote} = useDeleteNote();

  const {removingItem, setRemovingItem} = useNotesContext();

  const t = useScopedI18n('pages.main.notes.dialogs.remove');

  const onOpenChange = useCallback((open: boolean) => {
    !open && setRemovingItem(null)
  }, [setRemovingItem]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (removingItem?.item?.noteId) {
      await deleteNote(removingItem?.item?.noteId);
    }

    onOpenChange(false)
  }, [removingItem, onOpenChange, deleteNote]);

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

export default NoteRemoveDialog;