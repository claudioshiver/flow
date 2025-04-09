export class StringType {
  readonly type = "string";
  constructor(public defaultValue?: string) {}
}

export class NumberType {
  readonly type = "number";
  constructor(public defaultValue?: number) {}
}

export class BooleanType {
  readonly type = "boolean";
  constructor(public defaultValue?: boolean) {}
}

export class ArrayType<T> {
  readonly type = "array";
  constructor(
    public subType: "string" | "number" | "boolean" | "date",
    public defaultValue?: T[]
  ) {}
}

export class ObjectType<T> {
  readonly type = "object";
  constructor(public defaultValue?: T) {}
}

export class DateType {
  readonly type = "date";
  constructor(public defaultValue?: Date) {}
}

export type QueryType<T> =
  | StringType
  | NumberType
  | BooleanType
  | ArrayType<T>
  | ObjectType<T>
  | DateType;

export type UseQueryParamsOptions = Record<string, QueryType<any>>;

export type ExtractType<Q> =
  Q extends StringType
    ? string
    : Q extends NumberType
      ? number
      : Q extends BooleanType
        ? boolean
        : Q extends ArrayType<infer U>
          ? U[]
          : Q extends ObjectType<infer O>
            ? O
            : Q extends DateType
              ? Date
              : never;

export type QueryResult<O extends UseQueryParamsOptions> = {
  [K in keyof O]: ExtractType<O[K]>;
};

export type QueryUpdate<O extends UseQueryParamsOptions> = {
  [K in keyof O]?: ExtractType<O[K]> | null | undefined;
};

export type UseQueryParamsResult<O extends UseQueryParamsOptions> = {
  query: QueryResult<O>;
  setQuery: (updates: QueryUpdate<O>, replace?: boolean) => void;
}