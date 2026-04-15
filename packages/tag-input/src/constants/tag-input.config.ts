import { TagFormat } from "../types/tag-input.types";

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

export const DEFAULT_COMMIT_KEYS: string[] = ["Enter", "Space", "Comma", "Tab"];

export const PASTE_SPLIT_REGEX = /[\s,;\n\r]+/;

export const ARIA_LIVE_MESSAGES = {
  added: (value: string) => `${value} added`,
  removed: (value: string) => `${value} removed`,
  invalid: (value: string) => `${value} is not a valid entry`,
  duplicate: (value: string) => `${value} already exisFORMAT_VALIDATORSts`,
  maxReached: (max: number) => `Maximum of ${max} items reached`,
} as const;
