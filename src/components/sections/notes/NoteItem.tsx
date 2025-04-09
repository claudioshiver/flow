'use client';

import {MouseEvent, useLayoutEffect} from "react";
import {Note} from "@/lib/types/Note";
import NoteDropdown from "@/components/sections/notes/NoteDropdown";
import {Star} from "lucide-react";
import {MAX_RATE} from "@/lib/constants";
import {useCallback, useMemo} from "react";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {useAppContext} from "@/components/providers/AppProvider";
import cn from "classnames";
import {useTreeContext} from "@/components/providers/TreeProvider";
import {useScrollContext} from "@/components/providers/ScrollProvider";

type NoteItemProps = {
  note: Note;
  index?: number;
  last?: boolean;
  highlight?: string;
  category?: 'lyric' | 'tag';
}

const NoteItem = ({note, category, index, last, highlight}: NoteItemProps) => {
  const { data: lyrics } = useGetLyrics();
  const { noteId, setLyricNoteId, setTagNoteId } = useAppContext();
  const { setIsSearchingNote } = useTreeContext();
  const { targetRef, scrollIntoView } = useScrollContext();

  const highlighted = useMemo(() => (
    highlight
      ? note.content.split(highlight).join(`<strong>${highlight}</strong>`)
      : note.content
  ), [note.content, highlight]);

  const noteClass = useMemo(() => (
    cn('bg-muted py-1 px-2 rounded flex flex-col gap-1 border', {
      'ring-2 ring-primary': noteId === note.noteId,
      'cursor-pointer': highlight,
    })
  ), [highlight, note, noteId]);

  const content = useMemo(() => (
    highlighted.replaceAll('\n', '<br/>')
  ), [highlighted]);

  const lyricLabel = useMemo(() => (
    lyrics?.find(lyric => lyric.id === note.lyricId)?.label
  ), [lyrics, note]);

  const handleClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    if(!highlight) return;

    if(note.lyricId) {
      setLyricNoteId(note.lyricId, note.noteId);
    } else {
      setTagNoteId(note.tags[0], note.noteId);
    }

    setIsSearchingNote(false)
  }, [note, highlight, setLyricNoteId, setTagNoteId, setIsSearchingNote]);

  useLayoutEffect(() => {
    if(note.noteId === noteId) {
      setTimeout(scrollIntoView, 1000);
    }
  })

  return (
    <div ref={targetRef} onClick={handleClick} className={noteClass}>
      <div className="flex gap-2">
        <div
          dangerouslySetInnerHTML={{__html: content}}
          className="flex-1 whitespace-pre-wrap break-words text-xs font-sans font-normal" />
        {category && (
          <NoteDropdown
            index={index ?? 0}
            last={last ?? false}
            category={category}
            item={note}/>
        )}
      </div>
      <div className="flex flex-wrap justify-end items-center gap-2 text-[0.65rem] leading-[0.7rem] text-gray-400 font-semibold">
        {highlight && lyricLabel && (
          <div className="text-gray-500">{lyricLabel}</div>
        )}
        {note.tags?.map((tag, index) => (
          <div key={index}>{tag}</div>
        ))}
        <div className="inline-flex items-center gap-0.5">
          {Array.from({length: MAX_RATE}).map((tag, index) => (
            <Star key={index} size={10} fill={index < note.rate ? 'currentColor' : 'none'}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;