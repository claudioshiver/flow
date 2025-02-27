import {TreeNodeFolder, TreeNodeItem} from "@/lib/types/Tree";

export const addChildToParent = function<T extends "lyric" | "tag">(
  items: TreeNodeItem<T>[],
  parentId: string | null,
  item: TreeNodeItem<T>
) {
  if (parentId === null) {
    items.push(item);
    return true;
  }

  const searchAndAdd = (nodes: TreeNodeItem<T>[]): boolean => {
    for (const node of nodes) {
      if (node.id === parentId) {
        if (!('items' in node) || !node.items) (node as TreeNodeFolder<T>).items = [];
        (node as TreeNodeFolder<T>).items?.push(item);
        return true;
      }
      if (('items' in node) && node.items) {
        const added = searchAndAdd(node.items);
        if (added) return true;
      }
    }
    return false;
  }

  return searchAndAdd(items);
}

export const removeItemAndChildren = function<T extends "lyric" | "tag">(
  items: TreeNodeItem<T>[],
  id: string,
) {
  const searchAndRemove = (nodes: TreeNodeItem<T>[]): boolean => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        nodes.splice(i, 1);
        return true;
      }
      if (('items' in nodes[i]) && (nodes[i] as TreeNodeFolder<T>).items) {
        const removed = searchAndRemove((nodes[i] as TreeNodeFolder<T>).items!);
        if (removed) return true;
      }
    }
    return false;
  }

  return searchAndRemove(items);
}

export const searchItem = function<T extends "lyric" | "tag">(
  items: TreeNodeItem<T>[],
  id: string,
): TreeNodeItem<T> | null {
  const search = (nodes: TreeNodeItem<T>[]): TreeNodeItem<T> | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (('items' in node) && node.items) {
        const found = search(node.items);
        if (found) return found;
      }
    }

    return null;
  }

  return search(items);
}

export const flattenTreeLeaves = function<T extends 'lyric' | 'tag'>(
  items: TreeNodeItem<T>[],
  parentPath: string = ''
): { label: string; value: string }[] {
  let result: { label: string; value: string }[] = [];

  for (const node of items) {
    const currentPath = parentPath ? `${parentPath}/${node.label}` : node.label;

    if (node.type === 'leaf') {
      result.push({ label: currentPath, value: node.id });
    } else if (node.items) {
      result = result.concat(flattenTreeLeaves(node.items, currentPath));
    }
  }

  return result;
}