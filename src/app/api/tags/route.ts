import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import authOptions from "@/lib/auth";
import {NextSession} from "@/lib/types/Session";
import {TreeNodeItem} from "@/lib/types/Tree";
import {getTags, updateTags} from "@/app/api/tags/db";
import TagsSchema from "@/app/api/tags/schema";
import {getCurrentLocale, getScopedI18n} from "@/locales/lib/server";
import Locale from "@/lib/enums/Locale";

export async function GET() {
  const session: NextSession | null = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const tree = await getTags(session.user.id)

  return NextResponse.json(tree?.items || []);
}

export async function POST(request: NextRequest) {
  const body: TreeNodeItem<'tag'>[] = await request.json()
  const locale = await getCurrentLocale()
  const t = await getScopedI18n('models.tag')

  const session: NextSession | null = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const schema = TagsSchema({
    id: t('id'),
    label: t('label'),
    type: t('type'),
    items: t('items'),
    unique: t('unique'),
  }, locale as Locale)

  try {
    await schema.validate(body)
    await updateTags(session.user.id, body)

    return new NextResponse('', {status: 200});
  } catch(err: any) {
    return new NextResponse(err, {status: 400});
  }
}