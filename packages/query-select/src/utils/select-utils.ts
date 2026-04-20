import {
  QuerySelectOption,
  QuerySelectValue,
} from "../types/query-select.types";

export const resolveValue = <T extends QuerySelectOption>(
  value: QuerySelectValue<T> | undefined | null,
  options: T[]
): T[] => {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value.flatMap((v) => {
      if (typeof v === "string" || typeof v === "number") {
        const found = options.find((o) => o.value === v);
        return found ? [found] : [];
      }
      return [v as T];
    });
  }

  if (typeof value === "string" || typeof value === "number") {
    const found = options.find((o) => o.value === value);
    return found ? [found] : [];
  }

  return [value];
};
