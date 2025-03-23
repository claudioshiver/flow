'use client';

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useScopedI18n} from "@/locales/lib/client";
import {useTreeContext} from "@/components/providers/TreeProvider";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import {Input} from "@/components/ui/input";
import NoteItem from "@/components/sections/notes/NoteItem";
import * as React from "react";
import {useDebounceValue} from "usehooks-ts";

const NoteSearchDialog = () => {
  const t = useScopedI18n('pages.main.notes.dialogs.search');
  const {isSearchingNote, setIsSearchingNote} = useTreeContext();

  const [search, setSearch] = useDebounceValue('', 800);

  const {data: notes} = useGetNotes({
    search: search.length < 3 ? undefined : search
  });

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
            onChange={e => setSearch(e.target.value)}/>
          <div className="space-y-1">
            {notes?.map((note, index) => (
              <NoteItem key={index} highlight={search} note={note} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NoteSearchDialog;