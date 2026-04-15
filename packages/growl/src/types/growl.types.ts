export type GrowlType = "info" | "warning" | "success" | "error";
export type GrowlAnimation = "flip" | "zoom" | "slide" | "bounce" | "default";

export type GrowlTheme = "light" | "dark" | "colored";
export type GrowlPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface GrowlItem {
  id: number;
  title?: string;
  message: string;
  autoClose?: number;
  pauseOnHover: boolean;
  type: GrowlType;
  theme: GrowlTheme;
  style?: GrowlStyles;
  position?: GrowlPosition;
  animation: GrowlAnimation;
  className?: GrowlClassNames;
}

export interface GrowlProps {
  item: GrowlItem;
  onRemove: (id: number) => void;
}

export interface PositionGroupProps {
  toasts: GrowlItem[];
  position: GrowlPosition;
  onRemove: (id: number) => void;
}

export interface GrowlOptions {
  title?: string;
  autoClose?: number;
  pauseOnHover?: boolean;
  theme?: GrowlTheme;
  style?: GrowlStyles;
  position?: GrowlPosition;
  animation?: GrowlAnimation;
  className?: GrowlClassNames;
}

export interface GrowlStyles {
  body?: React.CSSProperties;
  progress?: React.CSSProperties;
  notification?: React.CSSProperties;
}

export interface GrowlClassNames {
  body?: string;
  progress?: string;
  notification?: string;
}

export interface GrowlInterface {
  (type: GrowlType, message: string, options?: GrowlOptions): void;
  success: (msg: string, opt?: GrowlOptions) => void;
  error: (msg: string, opt?: GrowlOptions) => void;
  info: (msg: string, opt?: GrowlOptions) => void;
  warning: (msg: string, opt?: GrowlOptions) => void;
}
