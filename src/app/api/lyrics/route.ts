import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import authOptions from "@/lib/auth";
import {NextSession} from "@/lib/types/Session";
import {TreeNodeItem} from "@/lib/types/Tree";
import {getLyrics, updateLyrics} from "@/app/api/lyrics/db";
import LyricsSchema from "@/app/api/lyrics/schema";
import {getCurrentLocale, getScopedI18n} from "@/locales/lib/server";
import Locale from "@/lib/enums/Locale";

export async function GET() {
  const session: NextSession | null = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const tree = await getLyrics(session.user.id)

  return NextResponse.json(tree?.items || []);
}

export async function POST(request: NextRequest) {
  const body: TreeNodeItem<'lyric'>[] = await request.json()
  const locale = await getCurrentLocale()
  const t = await getScopedI18n('models.lyric')

  const session: NextSession | null = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const schema = LyricsSchema({
    id: t('id'),
    label: t('label'),
    type: t('type'),
    items: t('items'),
  }, locale as Locale)

  try {
    await schema.validate(body)
    await updateLyrics(session.user.id, body)

    return new NextResponse('', {status: 200});
  } catch (err: any) {
    return new NextResponse({...err}, {status: 400});
  }
}