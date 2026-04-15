export type IconType =
  | string
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface InputClassNames {
  root?: string;
  label?: string;
  inputWrapper?: string;
  input?: string;
  beforeIcon?: string;
  afterIcon?: string;
  passwordToggle?: string;
  copyButton?: string;
  searchButton?: string;
  errorMessage?: string;
}

export interface InputStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  inputWrapper?: React.CSSProperties;
  input?: React.CSSProperties;
  beforeIcon?: React.CSSProperties;
  afterIcon?: React.CSSProperties;
  passwordToggle?: React.CSSProperties;
  copyButton?: React.CSSProperties;
  searchButton?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "style"
> {
  label?: string;
  error?: string;
  beforeIcon?: IconType;
  afterIcon?: IconType;
  isExistSearch?: boolean;
  isExistPassword?: boolean;
  isExistCopy?: boolean;
  isRequired?: boolean;
  onSearch?: () => void;
  className?: InputClassNames;
  style?: InputStyles;
}
