export interface RadioClassNames {
  root?: string;
  radioWrapper?: string;
  checkedWrapper?: string;
  innerDot?: string;
  label?: string;
  error?: string;
  popover?: string;
}

export interface RadioStyles {
  root?: React.CSSProperties;
  radioWrapper?: React.CSSProperties;
  checkedWrapper?: React.CSSProperties;
  innerDot?: React.CSSProperties;
  label?: React.CSSProperties;
  error?: React.CSSProperties;
  popover?: React.CSSProperties;
}

type NativeInputProps = Omit<
  React.JSX.IntrinsicElements["input"],
  "onChange" | "checked" | "popover" | "className" | "style"
>;

export interface RadioProps extends NativeInputProps {
  error?: string;
  name?: string;
  label?: string;
  popover?: string;
  checked?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  value: number | string;
  style?: RadioStyles;
  className?: RadioClassNames;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioOption {
  label: string;
  value: number | string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  disabled?: boolean;
  name?: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVertical?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  style?: RadioStyles;
  className?: RadioClassNames;
}
