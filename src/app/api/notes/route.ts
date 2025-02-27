import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import authOptions from "@/lib/auth";
import {NextSession} from "@/lib/types/Session";
import {putNote, getNotesByLyric, getNotesByTag, deleteNote} from "@/app/api/notes/db";
import {getCurrentLocale, getScopedI18n} from "@/locales/lib/server";
import Locale from "@/lib/enums/Locale";
import {NoteInput} from "@/lib/types/Note";
import NoteSchema from "@/app/api/notes/schema";

export async function GET(request: NextRequest) {
  const session: NextSession | null = await getServerSession(authOptions);
  const tag = request.nextUrl.searchParams.get("tag");
  const lyricId = request.nextUrl.searchParams.get("lyricId");

  if (!session?.user?.id) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const notes = !!lyricId
    ? await getNotesByLyric(session.user.id, lyricId)
    : !!tag
      ? await getNotesByTag(session.user.id, tag)
      : [];

  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const body: NoteInput = await request.json()
  const locale = await getCurrentLocale()
  const t = await getScopedI18n('models.note')

  const session: NextSession | null = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const schema = NoteSchema({
    noteId: t('noteId'),
    lyricId: t('lyricId'),
    lyricOrder: t('lyricOrder'),
    content: t('content'),
    createdAt: t('createdAt'),
    tags: t('tags'),
  }, locale as Locale)

  await schema.validate(body)
  await putNote(session.user.id, body)

  return new NextResponse('', {status: 200});
}

export async function DELETE(request: NextRequest) {
  const session: NextSession | null = await getServerSession(authOptions);
  const noteId = request.nextUrl.searchParams.get("id");

  if (!session?.user?.id) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  if (!noteId) {
    return NextResponse.json({error: "Bad Request"}, {status: 400});
  }

  await deleteNote(session.user.id, noteId);

  return new NextResponse('', {status: 200});
}