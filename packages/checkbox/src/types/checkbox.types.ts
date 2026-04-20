import type { JSX } from "react";

export interface CheckboxClassNames {
  root?: string;
  checkboxWrapper?: string;
  iconChecked?: string;
  iconDisabled?: string;
  viewError?: string;
  popover?: string;
  label?: string;
}

export interface CheckboxStyles {
  root?: React.CSSProperties;
  checkboxWrapper?: React.CSSProperties;
  iconChecked?: React.CSSProperties;
  iconDisabled?: React.CSSProperties;
  viewError?: React.CSSProperties;
  popover?: React.CSSProperties;
  label?: React.CSSProperties;
}

type InputProps = Omit<
  JSX.IntrinsicElements["input"],
  "popover" | "className" | "style"
>;

export interface CheckboxProps extends InputProps {
  error?: any;
  name?: string;
  label?: string;
  popover?: string | React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  className?: CheckboxClassNames;
  style?: CheckboxStyles;
  isRequired?: boolean;
  onChange?: (_val: React.ChangeEvent<HTMLInputElement>) => void;
}
