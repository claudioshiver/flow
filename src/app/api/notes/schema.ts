import * as yup from 'yup';
import Locale from "@/lib/enums/Locale";
import translations from "@/locales/yup";

export const NoteSchemaLabels = {
  noteId: '',
  lyricId: '',
  lyricOrder: '',
  content: '',
  createdAt: '',
  rate: '',
  tags: '',
};

const NoteSchema = function (
  labels = NoteSchemaLabels,
  locale: Locale = Locale.EN
) {
  yup.setLocale(translations[locale] as any);

  return yup.object({
    noteId: yup.string().label(labels.noteId).required(),
    lyricId: yup.string().label(labels.lyricId).optional(),
    lyricOrder: yup.number().label(labels.lyricOrder).optional(),
    content: yup.string().min(2).label(labels.content).required(),
    createdAt: yup.string().label(labels.createdAt).optional(),
    rate: yup.number().min(1).max(5).label(labels.rate).optional(),
    tags: yup.array().of(yup.string())
      .label(labels.tags)
      .required()
      .when('lyricId', ([lyricId], schema) => (
        !!lyricId ? schema : schema.min(1)
      ))
  }).required();
};

export type NoteSchemaType = yup.InferType<ReturnType<typeof NoteSchema>>;

export default NoteSchema;
