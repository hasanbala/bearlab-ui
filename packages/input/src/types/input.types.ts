export type IconType =
  | string
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface InputClassNames {
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

export interface InputStyles {
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

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "style" | "name"
> {
  name?: string;
  label?: string;
  error?: string;
  style?: InputStyles;
  afterIcon?: IconType;
  isRequired?: boolean;
  isExistCopy?: boolean;
  beforeIcon?: IconType;
  className?: InputClassNames;
  onSearch?: () => void;
}
