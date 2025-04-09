import {ArrayType, ExtractType, QueryType} from "@/lib/hooks/query/types";

export const parseValue = function <T>(
  raw: string | null,
  typeObj: QueryType<T>
): ExtractType<typeof typeObj> | undefined {
  const {type, defaultValue} = typeObj;

  if (raw == null || raw === "") {
    return defaultValue;
  }

  switch (type) {
    case "number": {
      const parsed = raw != null ? Number(raw) : undefined;
      return Number.isNaN(parsed) ? defaultValue : parsed ?? defaultValue;
    }
    case "boolean": {
      if (raw === "true") return true;
      if (raw === "false") return false;
      return defaultValue;
    }
    case "object": {
      try {
        return JSON.parse(raw);
      } catch {
        return defaultValue;
      }
    }
    case "date": {
      const date = new Date(raw);
      return isNaN(date.getTime()) ? defaultValue : date;
    }
    default:
      return raw ?? defaultValue ?? "";
  }
}

export const parseArrayValue = function <T>(
  rawArray: string[],
  typeObj: ArrayType<T>
): T[] {
  if (!rawArray.length) return typeObj.defaultValue ?? [];

  const results: T[] = [];

  for (const item of rawArray) {
    const parsed = parseValue(item, { type: typeObj.subType });
    if (parsed !== undefined) results.push(parsed as T);
  }

  return results.length ? results : typeObj.defaultValue ?? [];
}