'use client';

import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Pencil,
  Trash2
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useNotesContext} from "@/components/providers/NotesProvider";
import {Note} from "@/lib/types/Note";
import {useAppContext} from "@/components/providers/AppProvider";
import usePutNote from "@/lib/hooks/notes/usePutNote";
import useGetNotes from "@/lib/hooks/notes/useGetNotes";
import {useMemo} from "react";
import {getLyricOrder} from "@/lib/utils/notes";

type NoteDropdownProps = {
  item: Note;
  index: number;
  last: boolean;
  category: 'lyric' | 'tag';
}

const NoteDropdown = ({item, category, index, last}: NoteDropdownProps) => {
  const t = useScopedI18n('pages.main');

  const {lyricId} = useAppContext();
  const {trigger: putNode} = usePutNote();
  const {data: notes} = useGetNotes({lyricId});

  const lyricOrder = useMemo(() => (
    getLyricOrder(notes || [])
  ), [notes])

  const {
    setEditingItem,
    setRemovingItem,
    setMovingItem
  } = useNotesContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-accent shrink-0 ml-1"
          onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-sm">
        {(item.lyricId && item.tags?.length > 0) && (
          <DropdownMenuItem onClick={async e => {
            e.stopPropagation()
            await putNode({
              ...item,
              lyricId: undefined,
              lyricOrder: undefined
            })
          }}>
            <ArrowLeftToLine/>
            {t('dropdown.discard')}
          </DropdownMenuItem>
        )}
        {(!item.lyricId && lyricId) && (
          <DropdownMenuItem onClick={async e => {
            e.stopPropagation()
            await putNode({
              ...item,
              lyricId,
              lyricOrder,
            })
          }}>
            <ArrowRightToLine/>
            {t('dropdown.use')}
          </DropdownMenuItem>
        )}
        {(item.lyricId && index !== 0) && (
          <DropdownMenuItem onClick={async e => {
            e.stopPropagation()
            await Promise.all([
              putNode({...item, lyricOrder: notes![index - 1].lyricOrder}),
              putNode({...notes![index - 1], lyricOrder: item.lyricOrder}),
            ])
          }}>
            <ChevronUp/>
            {t('dropdown.moveUp')}
          </DropdownMenuItem>

        )}
        {(item.lyricId && !last) && (
          <DropdownMenuItem onClick={async e => {
            e.stopPropagation()
            await Promise.all([
              putNode({...item, lyricOrder: notes![index + 1].lyricOrder}),
              putNode({...notes![index + 1], lyricOrder: item.lyricOrder}),
            ])
          }}>
            <ChevronDown/>
            {t('dropdown.moveDown')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={e => {
          e.stopPropagation()
          setMovingItem({category, item: {...item}})
        }}>
          <ArrowUpRight/>
          {t('dropdown.move')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={e => {
          e.stopPropagation()
          setEditingItem({category, item: {...item}})
        }}>
          <Pencil/>
          {t('dropdown.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={e => {
          e.stopPropagation()
          setRemovingItem({category, item: {...item}})
        }}>
          <Trash2/>
          {t('dropdown.remove')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NoteDropdown;