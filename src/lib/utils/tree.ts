import {Tree, TreeNodeFolder, TreeNodeItem} from "@/lib/types/Tree";

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

export const renameItem = function<T extends "lyric" | "tag">(
  items: TreeNodeItem<T>[],
  item: TreeNodeItem<T>,
): void {
  const search = (nodes: TreeNodeItem<T>[]) => {
    for (const node of nodes) {
      if (node.id === item.id) {
        node.label = item.label;
      } else if (('items' in node) && node.items) {
        search(node.items);
      }
    }
  }

  search(items);
}

export const flattenTree = function<T extends 'lyric' | 'tag'>(
  items: TreeNodeItem<T>[],
  type: 'leaf' | 'folder',
  parentPath: string = '',
): { label: string; value: string }[] {
  let result: { label: string; value: string }[] = [];

  for (const node of items) {
    const currentPath = parentPath ? `${parentPath} / ${node.label}` : node.label;

    if (node.type === type) {
      result.push({ label: currentPath, value: node.id });
    }

    if ('items' in node && node.items) {
      result = result.concat(flattenTree(node.items, type, currentPath));
    }
  }

  return result;
}

export const moveNode = function<T extends 'lyric' | 'tag'>(
  items: TreeNodeItem<T>[],
  nodeId: string,
  newParentId: string | null
): boolean {
  let nodeToMove: TreeNodeItem<T> | null = null;

  function removeNode(nodes: TreeNodeItem<T>[]): boolean {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id === nodeId) {
        nodeToMove = node;
        nodes.splice(i, 1);
        return true;
      }
      if ('items' in node && node.items) {
        if (removeNode(node.items)) return true;
      }
    }
    return false;
  }

  function addNode(nodes: TreeNodeItem<T>[]): boolean {
    for (const node of nodes) {
      if (node.id === newParentId && node.type === 'folder') {
        if (!node.items) node.items = [];
        node.items.push(nodeToMove!);
        return true;
      }
      if (node.type === 'folder' && node.items) {
        if (addNode(node.items)) return true;
      }
    }
    return false;
  }

  if (!removeNode(items)) {
    return false;
  }

  if (newParentId === null) {
    items.push(nodeToMove!);
    return true;
  }

  return addNode(items);
}

export const sortTree = function<T extends 'lyric' | 'tag'>(tree: Tree<T>): Tree<T> {
  const sortItems = (items: TreeNodeItem<T>[]): TreeNodeItem<T>[] =>
    items
      .map(item =>
        item.type === 'folder'
          ? { ...item, items: item.items ? sortItems(item.items) : [] }
          : item
      )
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        return a.label.localeCompare(b.label);
      });

  return { ...tree, items: sortItems(tree?.items || []) };
}