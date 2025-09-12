export const COLOR_TYPE = {
  PRIMARY: "primary",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  LIGHT: "light",
  DARK: "dark",
} as const;

export const VARIANT_TYPE = {
  LIGHT: "light",
  SOLID: "solid",
} as const;

export const SIZE_TYPE = {
  SMALL: "small",
  MEDIUM: "medium",
} as const;

export type ColorType = (typeof COLOR_TYPE)[keyof typeof COLOR_TYPE];
export type VariantType = (typeof VARIANT_TYPE)[keyof typeof VARIANT_TYPE];
export type SizeType = (typeof SIZE_TYPE)[keyof typeof SIZE_TYPE];
