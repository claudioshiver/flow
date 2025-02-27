'use client';

import {ChangeEvent, FormEvent, useCallback, useMemo, useState} from "react";
import {v4 as uuid} from 'uuid';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import usePutNote from "@/lib/hooks/notes/usePutNote";
import {Textarea} from "@/components/ui/textarea";
import {MultiSelect} from "@/components/ui/multi-select";
import {flattenTreeLeaves} from "@/lib/utils/tree";

type NoteDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const NoteDialog = ({isOpen, onOpenChange}: NoteDialogProps) => {
  const {data: tags} = useGetTags();

  const {trigger: putNote} = usePutNote();

  const t = useScopedI18n('pages.main.dialogs.note');

  const [formData, setFormData] = useState({
    content: "",
    tags: [] as string[],
  })

  const tagsOptions = useMemo(()=> (
    flattenTreeLeaves(tags || [])
  ), [tags])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (formData.content) {
      await putNote({
        noteId: uuid(),
        ...formData,
      });

      setFormData({content: "", tags: []})
      onOpenChange(false)
    }
  }, [formData, putNote, onOpenChange]);

  const handleTags = useCallback((value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      tags: value
    }))
  }, []);

  const handleContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      content: e.target.value
    }))
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              value={formData.content}
              onChange={handleContent}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">{t('tags')}</Label>
            <MultiSelect
              placeholder={t('placeholder')}
              searchPlaceholder={t('searchPlaceholder')}
              emptyMessage={t('emptyMessage')}
              selected={formData.tags}
              onChange={handleTags}
              options={tagsOptions}/>
          </div>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NoteDialog;