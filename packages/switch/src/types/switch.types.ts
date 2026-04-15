type NativeInputProps = Omit<
  React.JSX.IntrinsicElements["input"],
  "popover" | "className" | "style"
>;

interface SwitchClassNames {
  root?: string;
  switchWrapper?: string;
  slider?: string;
  toggle?: string;
  label?: string;
  error?: string;
  popover?: string;
}

interface SwitchStyles {
  root?: React.CSSProperties;
  switchWrapper?: React.CSSProperties;
  slider?: React.CSSProperties;
  toggle?: React.CSSProperties;
  label?: React.CSSProperties;
  error?: React.CSSProperties;
  popover?: React.CSSProperties;
}

export interface SwitchProps extends NativeInputProps {
  error?: string;
  name?: string;
  label?: string;
  checked: boolean;
  popover?: string;
  disabled?: boolean;
  isRequired?: boolean;
  className?: SwitchClassNames;
  style?: SwitchStyles;
  onChange: (_val: React.ChangeEvent<HTMLInputElement>) => void;
}
