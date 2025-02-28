'use client';

import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useNotesContext} from "@/components/providers/NotesProvider";
import {Note} from "@/lib/types/Note";

type NoteDropdownProps = {
  item: Note
  category: 'lyric' | 'tag'
}

const NoteDropdown = ({item, category}: NoteDropdownProps) => {
  const t = useScopedI18n('pages.main');

  const {setEditingItem, setRemovingItem, setMovingItem} = useNotesContext();

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
      <DropdownMenuContent>
        <DropdownMenuItem onClick={e => {
          e.stopPropagation()
          setMovingItem({category, item: {...item}})
        }}>
          {t('dropdown.move')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={e => {
          e.stopPropagation()
          setEditingItem({category, item: {...item}})
        }}>
          {t('dropdown.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={e => {
          e.stopPropagation()
          setRemovingItem({category, item: {...item}})
        }}>
          {t('dropdown.remove')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NoteDropdown;