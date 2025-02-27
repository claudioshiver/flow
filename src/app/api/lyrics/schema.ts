import * as yup from 'yup';
import Locale from "@/lib/enums/Locale";
import {TreeNodeItem} from "@/lib/types/Tree";
import translations from "@/locales/yup";

export const LyricsSchemaLabels = {
  id: '',
  label: '',
  type: '',
  items: '',
};

const LyricsSchema = function(
  labels = LyricsSchemaLabels,
  locale: Locale = Locale.EN
) {
  yup.setLocale(translations[locale] as any);

  const treeNodeSchema: yup.Lazy<TreeNodeItem<'lyric'>> = yup.lazy(() =>
    yup.object({
      id: yup.string().label(labels.id).required(),
      label: yup.string().label(labels.label).required(),
      type: yup.string().oneOf(['leaf', 'folder']).label(labels.type).required(),
      items: yup.array().of(
        yup.lazy(() => treeNodeSchema)
      ).label(labels.items).optional()
    })
  );

  return yup.array().of(treeNodeSchema).required();
};

export type LyricsSchemaType = yup.InferType<ReturnType<typeof LyricsSchema>>;

export default LyricsSchema;
