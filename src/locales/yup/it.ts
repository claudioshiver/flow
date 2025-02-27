import { printValue } from 'yup';
import dayjs from "@/lib/utils/dayjs";

const yupIT = {
  mixed: {
    default: ({ label }: Record<string, string>) => `Il campo ${label || ''} non è valido`,
    required: ({ label }: Record<string, string>) => `Il campo ${label || ''} è obbligatorio`,
    defined: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve essere definito`,
    oneOf: ({ label, values }: Record<string, string>) => `Il campo ${label || ''} deve essere uno dei seguenti valori: ${values}`,
    notOneOf: ({ label, values }: Record<string, string>) => `Il campo ${label || ''} non deve essere uno dei seguenti valori: ${values}`,
    notType: ({ label, type, value, originalValue }: Record<string, string>) => {
      const castMsg =
        originalValue != null && originalValue !== value ?
          ` (dal valore \`${printValue(originalValue, true)}\`).` :
          '.';

      return type !== 'mixed' ?
        `Il campo ${label || ''} deve essere di tipo \`${type}\`, ` +
        `ma il valore è: \`${printValue(value, true)}\`` +
        castMsg :
        `Il campo ${label || ''} deve rispettare il tipo. ` +
        `Il valore è: \`${printValue(value, true)}\`` +
        castMsg;
    }
  },
  string: {
    length: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve essere esattamente ${length} caratteri`,
    min: ({ label, min }: Record<string, string>) => `Il campo ${label || ''} deve essere almeno di ${min} caratteri`,
    max: ({ label, max }: Record<string, string>) => `Il campo ${label || ''} deve essere al massimo di ${max} caratteri`,
    matches: ({ label, regex }: Record<string, string>) => `Il campo ${label || ''} deve rispettare questo pattern: "${regex}"`,
    email: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve essere un email valida`,
    url: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve essere una URL valida`,
    uuid: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve essere un UUID valido`,
    trim: ({ label }: Record<string, string>) => `Il campo ${label || ''} non può avere spazi vuoti agli estremi`,
    lowercase: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve contenere caratteri minuscoli`,
    uppercase: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve contenere caratteri maiuscoli`
  },
  number: {
    min: ({ label, min }: Record<string, string>) => `Il campo ${label || ''} deve essere uguale o superiore a ${min}`,
    max: ({ label, max }: Record<string, string>) => `Il campo ${label || ''} deve essere uguale o inferiore a ${max}`,
    lessThan: ({ label, less }: Record<string, string>) => `Il campo ${label || ''} deve essere inferiore a ${less}`,
    moreThan: ({ label, more }: Record<string, string>) => `Il campo ${label || ''} deve essere superiore a ${more}`,
    positive: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve essere un numero positivo`,
    negative: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve essere un numero negativo`,
    integer: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve essere un intero`
  },
  array: {
    min: ({ label, min }: Record<string, string | number>) => `Il campo ${label || ''} deve avere almeno ${min} ${min === 1 ? 'elemento' : 'elementi'}`,
    max: ({ label, max }: Record<string, string | number>) => `Il campo ${label || ''} deve avere al massimo ${max} ${max === 1 ? 'elemento' : 'elementi'}`,
    length: ({ label }: Record<string, string>) => `Il campo ${label || ''} deve avere ${length} ${length === 1 ? 'elemento' : 'elementi'}`
  },
  object: {
    noUnknown: ({ label, unknown }: Record<string, string>) => `Il campo ${label || ''} ha dei valori non specificati: ${unknown}`
  },
  date: {
    min: ({ label, min }: { label: string, min: Date }) => `Il campo ${label || ''} deve essere successivo a ${dayjs(min).format('DD/MM/YYYY')}`,
    max: ({ label, max }: { label: string, max: Date }) => `Il campo ${label || ''} deve essere precedente a ${dayjs(max).format('DD/MM/YYYY')}`
  },
  boolean: {
    isValue: ({ label, value }: Record<string, string>) => `Il campo ${label || ''} deve essere ${value}`
  }
};

export default yupIT;
