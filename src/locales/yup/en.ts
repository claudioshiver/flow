import { printValue } from 'yup';
import dayjs from "@/lib/utils/dayjs";

const yupEN = {
  mixed: {
    default: ({ label }: Record<string, string>) => `${label || ''} is invalid`,
    required: ({ label }: Record<string, string>) => `${label || ''} is a required field`,
    defined: ({ label }: Record<string, string>) => `${label || ''} must be defined`,
    oneOf: ({ label, values }: Record<string, string>) => `${label || ''} must be one of the following values: ${values}`,
    notOneOf: ({ label, values }: Record<string, string>) => `${label || ''} must not be one of the following values: ${values}`,
    notType: ({ label, type, value, originalValue }: Record<string, string>) => {
      const castMsg =
        originalValue != null && originalValue !== value ?
          ` (cast from the value \`${printValue(originalValue, true)}\`).` :
          '.';

      return type !== 'mixed' ?
        `${label || ''} must be a \`${type}\` type, ` +
        `but the final value was: \`${printValue(value, true)}\`` +
        castMsg :
        `${label || ''} must match the configured type. ` +
        `The validated value was: \`${printValue(value, true)}\`` +
        castMsg;
    }
  },
  string: {
    length: ({ label, length }: Record<string, string>) => `${label || ''} must be exactly ${length} characters`,
    min: ({ label, min }: Record<string, string>) => `${label || ''} must be at least ${min} characters`,
    max: ({ label, max }: Record<string, string>) => `${label || ''} must be at most ${max} characters`,
    matches: ({ label, regex }: Record<string, string>) => `${label || ''} must match the following: "${regex}"`,
    email: ({ label }: Record<string, string>) => `${label || ''} must be a valid email`,
    url: ({ label }: Record<string, string>) => `${label || ''} must be a valid URL`,
    uuid: ({ label }: Record<string, string>) => `${label || ''} must be a valid UUID`,
    trim: ({ label }: Record<string, string>) => `${label || ''} must be a trimmed string`,
    lowercase: ({ label }: Record<string, string>) => `${label || ''} must be a lowercase string`,
    uppercase: ({ label }: Record<string, string>) => `${label || ''} must be a upper case string`
  },
  number: {
    min: ({ label, min }: Record<string, string>) => `${label || ''} must be greater than or equal to ${min}`,
    max: ({ label, max }: Record<string, string>) => `${label || ''} must be less than or equal to ${max}`,
    lessThan: ({ label, less }: Record<string, string>) => `${label || ''} must be less than ${less}`,
    moreThan: ({ label, more }: Record<string, string>) => `${label || ''} must be greater than ${more}`,
    positive: ({ label }: Record<string, string>) => `${label || ''} must be a positive number`,
    negative: ({ label }: Record<string, string>) => `${label || ''} must be a negative number`,
    integer: ({ label }: Record<string, string>) => `${label || ''} must be an integer`
  },
  array: {
    min: ({ label, min }: Record<string, string>) => `${label || ''} field must have at least ${min} items`,
    max: ({ label, max }: Record<string, string>) => `${label || ''} field must have less than or equal to ${max} items`,
    length: ({ label, length }: Record<string, string>) => `${label || ''} must have ${length} items`
  },
  object: {
    noUnknown: ({ label, unknown }: Record<string, string>) => `${label || ''} field has unspecified keys: ${unknown}`
  },
  date: {
    min: ({ label, min }: { label: string, min: Date }) => `${label || ''} field must be later than ${dayjs(min).format('YYYY-MM-DD')}`,
    max: ({ label, max }: { label: string, max: Date }) => `${label || ''} field must be at earlier than ${dayjs(max).format('YYYY-MM-DD')}`
  },
  boolean: {
    isValue: ({ label, value }: Record<string, string>) => `${label || ''} field must be ${value}`
  }
};

export default yupEN;
