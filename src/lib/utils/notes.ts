import {Note} from "@/lib/types/Note";

export const getLyricOrder = function (notes?: Note[]) {
  const orders = notes?.map(note => note.lyricOrder)
    .filter(order => typeof order !== 'undefined') || [];

  const maxOrder = orders
    ? Math.max(...orders, 0) + 1
    : 0;

  return Math.max(maxOrder, notes?.length || 0)
}