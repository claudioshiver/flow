'use client';

import {APP_NAME} from "@/lib/constants";
import {LogOut, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import Section from "@/components/commons/Section";
import useGetTags from "@/lib/hooks/tags/useGetTags";
import useGetLyrics from "@/lib/hooks/lyrics/useGetLyrics";
import {useCallback} from "react";
import {Tree, TreeNode} from "@/components/ui/tree";
import {useScopedI18n} from "@/locales/lib/client";
import NodeAddDialog from "@/components/sections/tree/NodeAddDialog";
import {TreeNodeItem} from "@/lib/types/Tree";
import {useAppContext} from "@/components/providers/AppProvider";
import AddButton from "@/components/sections/tree/AddButton";
import NodeRemoveDialog from "@/components/sections/tree/NodeRemoveDialog";
import TreeDropdown from "@/components/sections/tree/TreeDropdown";
import NoteAddDialog from "@/components/sections/tree/NoteAddDialog";
import {useTreeContext} from "@/components/providers/TreeProvider";
import NodeRenameDialog from "@/components/sections/tree/NodeRenameDialog";
import NodeMoveDialog from "@/components/sections/tree/NodeMoveDialog";
import NoteSearchDialog from "@/components/sections/tree/NoteSearchDialog";
import * as React from "react";

const TreeSection = () => {
  const {data: tags, isLoading: isLoadingTags} = useGetTags();
  const {data: lyrics, isLoading: isLoadingLyrics} = useGetLyrics();

  const {setLyricId, setTag} = useAppContext();
  const {openItems, setOpenItems, setIsAddingNote, setIsSearchingNote} = useTreeContext();

  const t = useScopedI18n('pages.main');

  const handleToggle = useCallback((itemId: string, isOpen: boolean) => {
    setOpenItems({...openItems, [itemId]: isOpen})
  }, [openItems, setOpenItems]);

  const renderTreeItems = useCallback(<T extends 'lyric' | 'tag'>(
    items: TreeNodeItem<T>[],
    parentId: string | null,
    category: "lyric" | "tag",
    depth = 0,
  ) => {
    const handleClick = (itemId: string, itemType: 'folder' | 'leaf') => {
      (itemType === "leaf") && ((category === "lyric") ? setLyricId(itemId) : setTag(itemId))
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
            <TreeDropdown parentId={parentId} item={item} category={category}/>
          </div>
        }>
        {item.type === "folder" && renderTreeItems(item.items || [], item.id, category, depth + 1)}
      </TreeNode>
    ))
  }, [openItems, handleToggle, setLyricId, setTag]);

  return (
    <Section
      title={APP_NAME}
      after={
        <Button variant="ghost" size="icon" onClick={() => signOut()}>
          <LogOut className="h-4 w-4"/>
        </Button>
      }>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {!(isLoadingTags || isLoadingLyrics) && (
            <Tree>
              <TreeNode
                isFolder
                isOpen={openItems.lyrics}
                onToggle={(isOpen) => handleToggle('lyrics', isOpen)}
                label={<AddButton label={t('tree.lyrics')} category="lyric"/>}>
                {renderTreeItems(lyrics || [], null, "lyric", 1)}
              </TreeNode>
              <TreeNode
                isFolder
                isOpen={openItems.tags}
                onToggle={(isOpen) => handleToggle('tags', isOpen)}
                label={<AddButton label={t('tree.tags')} category="tag"/>}>
                {renderTreeItems(tags || [], null, "tag", 1)}
              </TreeNode>
            </Tree>
          )}
        </div>
        <div className="border-t pt-4 pb-2">
          <div className="flex gap-2 items-center justify-center">
            <Button
              className="w-full"
              onClick={() => setIsAddingNote(true)}>
              {t('notes.dialogs.add.title')}
            </Button>
            <Button onClick={() => setIsSearchingNote(true)}>
              <Search className="h-4 w-4"/>
            </Button>
          </div>
        </div>
      </div>

      <NodeAddDialog />
      <NodeMoveDialog />
      <NodeRenameDialog />
      <NodeRemoveDialog />

      <NoteAddDialog />
      <NoteSearchDialog />
    </Section>
  );
}

export default TreeSection;