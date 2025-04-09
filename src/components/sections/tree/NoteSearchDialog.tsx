'use client';

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useScopedI18n} from "@/locales/lib/client";
import {useTreeContext} from "@/components/providers/TreeProvider";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import {Input} from "@/components/ui/input";
import NoteItem from "@/components/sections/notes/NoteItem";
import * as React from "react";
import {useCallback, useState} from "react";
import {useDebounceValue} from "usehooks-ts";

const NoteSearchDialog = () => {
  const t = useScopedI18n('pages.main.notes.dialogs.search');
  const {isSearchingNote, setIsSearchingNote} = useTreeContext();

  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useDebounceValue('', 500)

  const {data: notes} = useGetNotes({
    search: debounced.length < 3 ? undefined : debounced
  });

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    setDebounced(value)
  }, [setDebounced]);

  return (
    <Dialog open={isSearchingNote} onOpenChange={setIsSearchingNote}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          <Input
            id="search"
            name="search"
            autoComplete="off"
            value={search}
            onChange={e => handleSearch(e.target.value)}/>
          <div className="space-y-1">
            {notes?.map((note, index) => (
              <NoteItem
                showLyric
                key={index}
                highlight={search}
                note={note}/>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NoteSearchDialog;