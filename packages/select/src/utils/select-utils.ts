import { SelectOption, SelectValue } from "../types/select.types";

export const resolveValue = <T extends SelectOption>(
  value: SelectValue<T> | undefined | null,
  options: T[]
): T[] => {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value.flatMap((v) => {
      if (typeof v === "string" || typeof v === "number") {
        const found = options.find((o) => o.value === v);
        return found ? [found] : [];
      }
      return [v as unknown as T];
    });
  }

  if (typeof value === "string" || typeof value === "number") {
    const found = options.find((o) => o.value === value);
    return found ? [found] : [];
  }

  return [value as unknown as T];
};

export const splitByMatch = (label: string, query: string): string[] => {
  const q = query.trim();
  if (!q) return [label];
  const pattern = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return label.split(new RegExp(`(${pattern})`, "gi"));
};
