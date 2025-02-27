'use client';

import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {v4 as uuid} from 'uuid';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import usePutTags from "@/lib/hooks/tags/usePutTags";
import usePutLyrics from "@/lib/hooks/lyrics/usePutLyrics";
import {addChildToParent} from "@/lib/utils/tree";

type AddDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  parentId: string | null
  type: 'lyric' | 'tag'
}

const AddDialog = ({isOpen, onOpenChange, parentId, type}: AddDialogProps) => {
  const {data: tags} = useGetTags();
  const {data: lyrics} = useGetLyrics();

  const {trigger: updateTags} = usePutTags();
  const {trigger: updateLyrics} = usePutLyrics();

  const t = useScopedI18n('pages.main.dialogs.add');

  const [formData, setFormData] = useState({
    label: "",
    type: "leaf" as "folder" | "leaf",
  })

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (formData.label) {
      if (type === 'lyric') {
        const clone = JSON.parse(JSON.stringify(lyrics));
        addChildToParent(clone, parentId, {id: uuid(), ...formData});
        await updateLyrics(clone);
      } else if (type === 'tag') {
        const clone = JSON.parse(JSON.stringify(tags));
        addChildToParent(clone, parentId, {id: formData.label, ...formData});
        await updateTags(clone);
      }

      setFormData({label: "", type: "leaf"})
      onOpenChange(false)
    }
  }, [formData, type, onOpenChange, lyrics, parentId, updateLyrics, tags, updateTags]);

  const handleType = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value as "folder" | "leaf"
    }))
  }, []);

  const handleName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      label: type === 'tag'
        ? String(e.target.value).trim().toLowerCase().replace(/[^a-z0-9]/g, '')
        : e.target.value
    }))
  }, [type]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <RadioGroup
            name="type"
            className="flex gap-4 justify-start items-center"
            value={formData.type}
            onValueChange={handleType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="leaf" id="leaf"/>
              <Label htmlFor="item">{t('leaf')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="folder" id="folder"/>
              <Label htmlFor="folder">{t('folder')}</Label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Label htmlFor="label">{t('label')}</Label>
            <Input
              autoFocus
              id="label"
              name="label"
              autoComplete="off"
              value={formData.label}
              onChange={handleName}/>
          </div>
          <Button type="submit">{t('submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDialog;