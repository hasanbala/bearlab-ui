export enum PERMISSIONS {
  DEFAULT = "default",
  UNDEFAULT = "undefault",
}

export interface IPermissions {
  default?: boolean;
  undefault?: boolean;
}
