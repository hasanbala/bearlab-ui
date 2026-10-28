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
  type: GrowlType;
  theme: GrowlTheme;
  autoClose?: number;
  style?: GrowlStyles;
  pauseOnHover: boolean;
  position?: GrowlPosition;
  animation: GrowlAnimation;
  className?: GrowlClassNames;
}

export interface GrowlLabels {
  close?: string;
  info?: string;
  error?: string;
  success?: string;
  warning?: string;
}

export interface GrowlContainerProps {
  labels?: GrowlLabels;
}

export interface GrowlProps {
  item: GrowlItem;
  labels: Required<GrowlLabels>;
  onRemove: (id: number) => void;
}

export interface PositionGroupProps {
  toasts: GrowlItem[];
  position: GrowlPosition;
  labels: Required<GrowlLabels>;
  onRemove: (id: number) => void;
}

export interface GrowlOptions {
  title?: string;
  autoClose?: number;
  theme?: GrowlTheme;
  style?: GrowlStyles;
  pauseOnHover?: boolean;
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
  info: (msg: string, opt?: GrowlOptions) => void;
  error: (msg: string, opt?: GrowlOptions) => void;
  success: (msg: string, opt?: GrowlOptions) => void;
  warning: (msg: string, opt?: GrowlOptions) => void;
}
