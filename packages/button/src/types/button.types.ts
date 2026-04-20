export type ButtonType = "iconWithText" | "justIcon" | "justText";
export type ButtonHtmlType = "button" | "submit";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "secondary-success"
  | "secondary-error"
  | "secondary-warning"
  | "secondary-info"
  | "secondary-dark"
  | "liquid-holographic"
  | "liquid-tinted"
  | "light-success"
  | "light-error"
  | "light-warning"
  | "light-info"
  | "light-light"
  | "light-dark"
  | "solid-success"
  | "solid-error"
  | "solid-warning"
  | "solid-info"
  | "solid-light"
  | "solid-dark";

export type ButtonIconTypeValues =
  | "none"
  | "delete"
  | "arrow"
  | "export"
  | "add"
  | "document"
  | "update"
  | "search"
  | "close"
  | "notify"
  | "arrow_down"
  | "minus"
  | "plus"
  | "filter"
  | "dots"
  | "arrow_down2"
  | "arrow_right"
  | "tick"
  | "copy";

export interface ButtonClassNames {
  root?: string;
  popover?: string;
}

export interface ButtonStyles {
  root?: React.CSSProperties;
  popover?: React.CSSProperties;
}

export interface ButtonProps {
  label: string | number;
  isLoading?: boolean;
  iconType?: {
    default: ButtonIconTypeValues;
    custom?: null | React.ReactElement;
  };
  buttonType: ButtonType;
  disabled?: boolean;
  htmlType?: ButtonHtmlType;
  onClick?: (_val: React.MouseEvent<HTMLButtonElement>) => void;
  reverseIconText?: boolean;
  variant?: ButtonVariant;
  className?: ButtonClassNames;
  style?: ButtonStyles;
}
