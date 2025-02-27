'use client';

import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useScopedI18n} from "@/locales/lib/client";
import {TreeNodeItem} from "@/lib/types/Tree";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useTreeContext} from "@/components/providers/TreeProvider";

type TreeDropdownProps = {
  parentId: string | null
  item: TreeNodeItem<'lyric' | 'tag'>
  category: 'lyric' | 'tag'
}

const TreeDropdown = ({parentId, item, category}: TreeDropdownProps) => {
  const t = useScopedI18n('pages.main');

  const {setAddingItem, setRemovingItem, setRenamingItem, setMovingItem} = useTreeContext();

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
            setAddingItem({category, item: {...item}})
          }}>
            {t('dropdown.add')}
          </DropdownMenuItem>
        )}
        {(category === 'lyric' || item.type === "folder") && (
          <DropdownMenuItem onClick={e => {
            e.stopPropagation()
            setRenamingItem({category, item: {...item}})
          }}>
            {t('dropdown.rename')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={e => {
          e.stopPropagation()
          setMovingItem({category, parentId, item: {...item}})
        }}>
          {t('dropdown.move')}
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

export default TreeDropdown;