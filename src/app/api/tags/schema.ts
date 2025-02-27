import * as yup from 'yup';
import Locale from "@/lib/enums/Locale";
import {TreeNodeItem} from "@/lib/types/Tree";
import translations from "@/locales/yup";

export const TagsSchemaLabels = {
  id: '',
  label: '',
  type: '',
  items: '',
  unique: '',
};

const TagsSchema = function(
  labels = TagsSchemaLabels,
  locale: Locale = Locale.EN
) {
  yup.setLocale(translations[locale] as any);

  const uniqueIds = (nodes: any[], ids = new Set<string>()): boolean => {
    for (const node of nodes) {
      if (ids.has(node.id)) {
        return false;
      }
      ids.add(node.id);
      if (node.items) {
        if (!uniqueIds(node.items, ids)) return false;
      }
    }
    return true;
  }

  const treeNodeSchema: yup.Lazy<TreeNodeItem<'tag'>> = yup.lazy(() =>
    yup.object({
      id: yup.string().label(labels.id).required(),
      label: yup.string().label(labels.label).required(),
      type: yup.string().oneOf(['leaf', 'folder']).label(labels.type).required(),
      items: yup.array().of(
        yup.lazy(() => treeNodeSchema)
      ).label(labels.items).optional()
    })
  );

  return yup.array()
    .of(treeNodeSchema)
    .required()
    .test("unique-ids", labels.unique, (nodes) =>
      nodes ? uniqueIds(nodes) : true
    );
};

export type TagsSchemaType = yup.InferType<ReturnType<typeof TagsSchema>>;

export default TagsSchema;
