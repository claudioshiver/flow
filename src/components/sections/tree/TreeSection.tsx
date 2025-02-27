'use client';

import {APP_NAME} from "@/lib/constants";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import Section from "@/components/commons/Section";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {useCallback, useState} from "react";
import {Tree, TreeNode} from "@/components/ui/tree";
import {useScopedI18n} from "@/locales/lib/client";
import AddDialog from "@/components/sections/tree/AddDialog";
import {TreeNodeItem} from "@/lib/types/Tree";
import {useAppContext} from "@/components/providers/AppProvider";
import AddButton from "@/components/sections/tree/AddButton";
import RemoveDialog from "@/components/sections/tree/RemoveDialog";
import TreeDropdown from "@/components/sections/tree/TreeDropdown";

const TreeSection = () => {
  const {data: tags, isLoading: isLoadingTags} = useGetTags();
  const {data: lyrics, isLoading: isLoadingLyrics} = useGetLyrics();

  const {setLyricId, setTag} = useAppContext();

  const t = useScopedI18n('pages.main');

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const [removingItem, setRemovingItem] = useState<{
    type: "lyric" | "tag"
    id: string
  } | null>(null);

  const [addingItem, setAddingItem] = useState<{
    type: "lyric" | "tag"
    parentId: string | null
  } | null>(null);

  const renderTreeItems = useCallback(<T extends 'lyric' | 'tag'>(
    items: TreeNodeItem<T>[],
    type: "lyric" | "tag",
    depth = 0,
  ) => {
    const handleToggle = (itemId: string, isOpen: boolean) => {
      setOpenItems({...openItems, [itemId]: isOpen})
    }

    const handleClick = (itemId: string, itemType: 'folder' | 'leaf') => {
      (itemType === "leaf") && ((type === "lyric") ? setLyricId(itemId) : setTag(itemId))
    }

    return items.map((item) => (
      <TreeNode
        key={item.id}
        depth={depth}
        isOpen={openItems[item.id]}
        isFolder={item.type === "folder"}
        onToggle={(isOpen) => handleToggle(item.id, isOpen)}
        onClick={() => handleClick(item.id, item.type)}
        label={
          <div className="flex items-center justify-between w-full">
            <span className="truncate">{item.label}</span>
            <TreeDropdown
              item={item}
              type={type}
              setAddingItem={setAddingItem}
              setRemovingItem={setRemovingItem}/>
          </div>
        }>
        {item.type === "folder" && renderTreeItems(item.items || [], type, depth + 1)}
      </TreeNode>
    ))
  }, [openItems, setLyricId, setTag]);

  return (
    <Section
      title={APP_NAME}
      action={
        <Button variant="ghost" size="icon" onClick={() => signOut()}>
          <LogOut className="h-4 w-4"/>
        </Button>
      }>
      {!(isLoadingTags || isLoadingLyrics) && (
        <Tree>
          <TreeNode
            isFolder
            isOpen={true}
            label={<AddButton label={t('tree.lyrics')} setAddingTo={setAddingItem}/>}>
            {renderTreeItems(lyrics || [], "lyric", 1)}
          </TreeNode>
          <TreeNode
            isFolder
            isOpen={true}
            label={<AddButton label={t('tree.tags')} setAddingTo={setAddingItem}/>}>
            {renderTreeItems(tags || [], "tag", 1)}
          </TreeNode>
        </Tree>
      )}

      <AddDialog
        isOpen={!!addingItem}
        type={addingItem?.type!}
        parentId={addingItem?.parentId ?? null}
        onOpenChange={open => !open && setAddingItem(null)}/>

      <RemoveDialog
        isOpen={!!removingItem}
        type={removingItem?.type!}
        id={removingItem?.id!}
        onOpenChange={open => !open && setRemovingItem(null)}/>
    </Section>
  );
}

export default TreeSection;