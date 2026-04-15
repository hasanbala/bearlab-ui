import {
  FORMAT_VALIDATORS,
  PASTE_SPLIT_REGEX,
} from "../constants/tag-input.config";
import { CommitResult, TagFormat, TagItem } from "../types/tag-input.types";
import { useId } from "react";

export const isValidTag = (
  value: string,
  format: TagFormat,
  validate?: (value: string) => boolean
): boolean => {
  if (validate) return validate(value);
  if (format === "custom") return true;
  return FORMAT_VALIDATORS[format](value);
};

export const createTagItem = (
  value: string,
  format: TagFormat,
  validate?: (value: string) => boolean
): TagItem => {
  return {
    id: useId(),
    value: value.trim(),
    status: isValidTag(value.trim(), format, validate) ? "valid" : "invalid",
  };
};

export const isDuplicate = (
  value: string,
  existingItems: TagItem[]
): boolean => {
  return existingItems.some(
    (item) => item.value.toLowerCase() === value.trim().toLowerCase()
  );
};

export const parsePastedText = (text: string): string[] => {
  return text
    .split(PASTE_SPLIT_REGEX)
    .map((v) => v.trim())
    .filter(Boolean);
};

export const removeItemById = (items: TagItem[], id: string): TagItem[] => {
  return items.filter((item) => item.id !== id);
};

export const commitValue = (
  rawValue: string,
  currentList: TagItem[],
  format: TagFormat,
  options: {
    validate?: (v: string) => boolean;
    allowDuplicates?: boolean;
    maxItems?: number;
  } = {}
): CommitResult => {
  const trimmed = rawValue.trim();

  if (!trimmed) {
    return { nextList: null, announcement: null, item: null, reason: "empty" };
  }

  const { allowDuplicates = false, maxItems, validate } = options;

  if (maxItems !== undefined && currentList.length >= maxItems) {
    return {
      nextList: null,
      announcement: `Maximum of ${maxItems} items reached`,
      item: null,
      reason: "max-reached",
    };
  }

  if (!allowDuplicates && isDuplicate(trimmed, currentList)) {
    return {
      nextList: null,
      announcement: `${trimmed} already exists`,
      item: null,
      reason: "duplicate",
    };
  }

  const item = createTagItem(trimmed, format, validate);
  return {
    nextList: [...currentList, item],
    announcement:
      item.status === "valid" ? `${trimmed} added` : `${trimmed} is not valid`,
    item,
    reason: "added",
  };
};
