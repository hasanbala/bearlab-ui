import type { JSX } from "react";

export interface CheckboxClassNames {
  root?: string;
  label?: string;
  popover?: string;
  viewError?: string;
  iconChecked?: string;
  iconDisabled?: string;
  checkboxWrapper?: string;
}

export interface CheckboxStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  popover?: React.CSSProperties;
  viewError?: React.CSSProperties;
  iconChecked?: React.CSSProperties;
  iconDisabled?: React.CSSProperties;
  checkboxWrapper?: React.CSSProperties;
}

type InputProps = Omit<
  JSX.IntrinsicElements["input"],
  "popover" | "className" | "style"
>;

export interface CheckboxProps extends InputProps {
  error?: any;
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  style?: CheckboxStyles;
  className?: CheckboxClassNames;
  popover?: string | React.ReactNode;
  onChange?: (_val: React.ChangeEvent<HTMLInputElement>) => void;
}
