import { TagFormat, TagInputLabels } from "../types/tag-input.types";

export const REGEX_EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export const REGEX_DOMAIN =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

export const FORMAT_VALIDATORS: Record<TagFormat, (value: string) => boolean> =
  {
    email: (v) => REGEX_EMAIL.test(v),
    domain: (v) => {
      const stripped = v.replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
      return REGEX_DOMAIN.test(stripped);
    },
    custom: () => true,
  };

export const DEFAULT_COMMIT_KEYS: string[] = ["Enter", " ", ",", "Tab"];

export const PASTE_SPLIT_REGEX = /[\s,;\n\r]+/;

export const DEFAULT_TAG_INPUT_LABELS: Required<TagInputLabels> = {
  added: (value) => `${value} added`,
  removed: (value) => `${value} removed`,
  invalid: (value) => `${value} is not valid`,
  duplicate: (value) => `${value} already exists`,
  maxReached: (max) => `Maximum of ${max} items reached`,
  pasted: (count) => `${count} items pasted`,
  tag: (value, isValid) =>
    `${value}, ${isValid ? "valid" : "invalid"}. Press delete to remove.`,
  remove: (value) => `Remove ${value}`,
};
