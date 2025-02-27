type BaseNote = {
  noteId: string;
  lyricId?: string;
  lyricOrder?: number;
  content: string;
}

export type NoteInput = BaseNote & {
  createdAt?: string;
  tags: string[];
}

export type NoteModel = BaseNote & {
  id: string;
  userId: string;
  createdAt: string;
  tags: string;
}

export type Note = BaseNote & {
  id: string;
  userId: string;
  createdAt: string;
  tags: string[];
}