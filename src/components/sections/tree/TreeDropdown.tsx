'use client';

import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import {TreeNodeItem} from "@/lib/types/Tree";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

type TreeDropdownProps = {
  item: TreeNodeItem<'lyric' | 'tag'>
  type: 'lyric' | 'tag'
  setAddingItem: (item: { type: 'lyric' | 'tag', parentId: string | null }) => void
  setRemovingItem: (item: { type: 'lyric' | 'tag', id: string }) => void
}

const TreeDropdown = ({item, type, setAddingItem, setRemovingItem}: TreeDropdownProps) => {
  const t = useScopedI18n('pages.main');

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
        {item.type === "folder" && (
          <DropdownMenuItem onClick={e => {
            e.stopPropagation()
            setAddingItem({type, parentId: item.id})
          }}>
            {t('dropdown.add')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={e => {
          e.stopPropagation()
          setRemovingItem({type, id: item.id})
        }}>
          {t('dropdown.remove')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TreeDropdown;