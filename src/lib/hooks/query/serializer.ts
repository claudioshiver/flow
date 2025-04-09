import {ArrayType, QueryType} from "@/lib/hooks/query/types";

export const serializeValue = function<T>(
  value: any,
  typeObj: QueryType<T>
): string | null {
  if (value == null || value === "") return null;

  switch (typeObj.type) {
    case "object":
      return JSON.stringify(value);
    case "date":
      return (value instanceof Date) ? value.toISOString() : null;
    default:
      return String(value);
  }
}
export const serializeArrayValue = function <T>(
  array: T[],
  typeObj: ArrayType<T>
): string[] {
  return array.map((item) => {
    if (typeObj.subType === "date" && item instanceof Date) {
      return item.toISOString();
    } else if (typeObj.subType === "boolean") {
      return item ? "true" : "false";
    }

    return String(item);
  });
}