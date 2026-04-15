export const searchInValue = (val: any, searchLower: string): boolean => {
  if (typeof val === "string") {
    return val.toLowerCase().includes(searchLower);
  }
  if (val && typeof val === "object" && !Array.isArray(val)) {
    return Object.values(val).some((v) => searchInValue(v, searchLower));
  }
  return false;
};
