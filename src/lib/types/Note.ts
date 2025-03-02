type BaseNote = {
  noteId: string;
  lyricId?: string;
  lyricOrder?: number;
  content: string;
}

export type NoteInput = BaseNote & {
  createdAt?: string;
  rate?: number;
  tags: string[];
}

export type NoteModel = BaseNote & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  rate: number;
  tags: string;
  sortOrder: string;
}

export type Note = BaseNote & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  rate: number;
  tags: string[];
  sortOrder: string;
}