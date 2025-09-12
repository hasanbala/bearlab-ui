export const PERMISSIONS = {
  DEFAULT: "default",
  UNDEFAULT: "undefault",
} as const;

export interface IPermissions {
  default?: boolean;
  undefault?: boolean;
}

export type Permissions = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
