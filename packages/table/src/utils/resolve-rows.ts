export const resolveRows = (
  keys: string[],
  dataSource: Record<string, any>[]
): Record<string, any>[] =>
  keys
    .map((key) => dataSource.find((r) => r["key"] === key))
    .filter(Boolean) as Record<string, any>[];
