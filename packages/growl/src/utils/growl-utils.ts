import { GrowlItem } from "../types/growl.types";

export let _addGrowl: ((item: Omit<GrowlItem, "id">) => void) | null = null;

export const setAddGrowl = (
  fn: ((item: Omit<GrowlItem, "id">) => void) | null
) => {
  _addGrowl = fn;
};
