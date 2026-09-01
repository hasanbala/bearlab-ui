export type IconType =
  | string
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface OutlineInputClassNames {
  root?: string;
  label?: string;
  input?: string;
  afterIcon?: string;
  beforeIcon?: string;
  copyButton?: string;
  inputWrapper?: string;
  errorMessage?: string;
  searchButton?: string;
  passwordToggle?: string;
}

export interface OutlineInputStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  input?: React.CSSProperties;
  afterIcon?: React.CSSProperties;
  copyButton?: React.CSSProperties;
  beforeIcon?: React.CSSProperties;
  searchButton?: React.CSSProperties;
  inputWrapper?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
  passwordToggle?: React.CSSProperties;
}

export interface OutlineInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "style" | "name" | "placeholder"
> {
  name?: string;
  label?: string;
  error?: string;
  style?: OutlineInputStyles;
  afterIcon?: IconType;
  isRequired?: boolean;
  isExistCopy?: boolean;
  beforeIcon?: IconType;
  className?: OutlineInputClassNames;
  onSearch?: () => void;
}
