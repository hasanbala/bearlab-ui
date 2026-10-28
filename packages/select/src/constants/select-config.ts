import type { SelectLabels } from "../types/select.types";

export const ARROW_OFFSET = 44;
export const MORE_BADGE_ESTIMATED_WIDTH = 45;
export const ITEMS_GAP = 8;
export const DEFAULT_ITEM_WIDTH = 120;

export const SELECTED_ITEM_MARKER = "data-bearlab-select-item";
export const VISIBLE_SELECTED_ITEM_SELECTOR = `[${SELECTED_ITEM_MARKER}="visible"]`;

export const DEFAULT_SELECT_LABELS: Required<SelectLabels> = {
  options: "Options",
  loading: "Loading options",
  selected: (count) => `${count} selected`,
  moreSelected: (count) => `${count} more selected`,
  remove: (label) => `Remove ${label}`,
};
