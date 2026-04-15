export const getNestedValue = (obj: Record<string, any>, path: string): any => {
  if (!path) return undefined;
  return path.split(".").reduce((current, key) => {
    return current != null && current[key] !== undefined
      ? current[key]
      : undefined;
  }, obj);
};
