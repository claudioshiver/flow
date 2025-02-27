export type TreeNodeLeaf = {
  id: string;
  label: string;
  type: 'leaf';
}

export type TreeNodeFolder<T extends 'lyric' | 'tag'> = {
  id: string;
  label: string;
  type: 'folder';
  items?: TreeNodeItem<T>[];
}

export type TreeNodeItem<T extends 'lyric' | 'tag'> = TreeNodeLeaf | TreeNodeFolder<T>;

export type Tree<T extends 'lyric' | 'tag'> = {
  id: string;
  items: TreeNodeItem<T>[]
}