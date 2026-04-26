type NativeInputProps = Omit<
  React.JSX.IntrinsicElements["input"],
  "popover" | "className" | "style"
>;

export interface SwitchClassNames {
  root?: string;
  label?: string;
  error?: string;
  slider?: string;
  toggle?: string;
  popover?: string;
  switchWrapper?: string;
}

export interface SwitchStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  error?: React.CSSProperties;
  toggle?: React.CSSProperties;
  slider?: React.CSSProperties;
  popover?: React.CSSProperties;
  switchWrapper?: React.CSSProperties;
}

export interface SwitchProps extends NativeInputProps {
  name?: string;
  error?: string;
  label?: string;
  checked: boolean;
  popover?: string;
  disabled?: boolean;
  isRequired?: boolean;
  style?: SwitchStyles;
  className?: SwitchClassNames;
  onChange: (_val: React.ChangeEvent<HTMLInputElement>) => void;
}
