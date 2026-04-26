export type ButtonType = "iconWithText" | "justIcon" | "justText";
export type ButtonHtmlType = "button" | "submit";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "secondary-info"
  | "secondary-dark"
  | "secondary-error"
  | "secondary-success"
  | "secondary-warning"
  | "liquid-tinted"
  | "liquid-holographic"
  | "light-dark"
  | "light-info"
  | "light-error"
  | "light-light"
  | "light-warning"
  | "light-success"
  | "solid-dark"
  | "solid-info"
  | "solid-light"
  | "solid-error"
  | "solid-warning"
  | "solid-success";

export type ButtonIconTypeValues =
  | "add"
  | "none"
  | "copy"
  | "tick"
  | "plus"
  | "dots"
  | "minus"
  | "close"
  | "delete"
  | "arrow"
  | "update"
  | "search"
  | "notify"
  | "export"
  | "filter"
  | "document"
  | "arrow_down"
  | "arrow_right"
  | "arrow_down2";

export interface ButtonClassNames {
  root?: string;
  popover?: string;
}

export interface ButtonStyles {
  root?: React.CSSProperties;
  popover?: React.CSSProperties;
}

export interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  style?: ButtonStyles;
  buttonType: ButtonType;
  label: string | number;
  variant?: ButtonVariant;
  htmlType?: ButtonHtmlType;
  reverseIconText?: boolean;
  className?: ButtonClassNames;
  iconType?: {
    default: ButtonIconTypeValues;
    custom?: null | React.ReactElement;
  };
  onClick?: (_val: React.MouseEvent<HTMLButtonElement>) => void;
}
