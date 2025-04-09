"use client";

import {useCallback, useMemo} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {parseArrayValue, parseValue} from "@/lib/hooks/query/parser";
import {serializeArrayValue, serializeValue} from "@/lib/hooks/query/serializer";
import {
  QueryResult,
  QueryUpdate,
  UseQueryParamsOptions,
  UseQueryParamsResult
} from "@/lib/hooks/query/types";

const useQueryParams = function<O extends UseQueryParamsOptions>(options: O): UseQueryParamsResult<O> {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = useMemo(() => {
    const result: Partial<QueryResult<O>> = {};

    for (const key of Object.keys(options) as (keyof O)[]) {
      const typeObj = options[key];

      if (typeObj.type === "array") {
        const rawArray = searchParams.getAll(key as string);
        (result as any)[key] = parseArrayValue(rawArray, typeObj);
      } else {
        const raw = searchParams.get(key as string);
        (result as any)[key] = parseValue(raw, typeObj);
      }
    }
    return result as QueryResult<O>;
  }, [options, searchParams]);

  const setQuery = useCallback((updates: QueryUpdate<O>, replace = false) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const key of Object.keys(updates) as (keyof O)[]) {
      const newValue = updates[key];
      const typeObj = options[key];

      if (newValue == null || newValue === "") {
        params.delete(key as string);
      } else {
        if (typeObj.type === "array") {
          params.delete(key as string);
          const arr = serializeArrayValue(newValue, typeObj);
          arr.forEach((val) => params.append(key as string, val));
        } else {
          const serialized = serializeValue(newValue, typeObj);
          (serialized == null) ? params.delete(key as string) : params.set(key as string, serialized);
        }
      }
    }


    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    (replace) ? router.replace(newUrl) : router.push(newUrl);
  }, [pathname, router, searchParams, options]);

  return useMemo(() => ({
    query,
    setQuery,
  }), [query, setQuery]);
}

export default useQueryParams;