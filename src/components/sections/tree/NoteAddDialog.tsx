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
import {flattenTree} from "@/lib/utils/tree";
import {useTreeContext} from "@/components/providers/TreeProvider";
import StarRating from "@/components/ui/star-rating";
import {MAX_RATE} from "@/lib/constants";

const NoteAddDialog = () => {
  const {data: tags} = useGetTags();
  const {trigger: putNote} = usePutNote();

  const {isAddingNote, setIsAddingNote} = useTreeContext();

  const t = useScopedI18n('pages.main.notes.dialogs.add');

  const [formData, setFormData] = useState({
    content: "",
    tags: [] as string[],
    rate: 1,
  })

  const tagsOptions = useMemo(()=> (
    flattenTree(tags || [], 'leaf')
  ), [tags])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (formData.content) {
      await putNote({
        noteId: uuid(),
        ...formData,
      });

      setFormData({content: "", tags: [], rate: 1})
      setIsAddingNote(false)
    }
  }, [formData, putNote, setIsAddingNote]);

  const handleTags = useCallback((value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      tags: value
    }))
  }, []);

  const handleRate = useCallback((value: number) => {
    setFormData((prev) => ({
      ...prev,
      rate: value
    }))
  }, []);

  const handleContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      content: e.target.value
    }))
  }, []);

  return (
    <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="content">{t('content')}</Label>
            <Textarea
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
          <div className="grid gap-2">
            <Label htmlFor="rate">{t('rate')}</Label>
            <StarRating
              value={formData.rate}
              onChange={handleRate}
              max={MAX_RATE}/>
          </div>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NoteAddDialog;