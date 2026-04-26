export interface OTPFormClassNamesProps {
  root?: string;
  input?: string;
  inputs?: string;
  subHeader?: string;
}

export interface OTPFormStylesProps {
  root?: React.CSSProperties;
  input?: React.CSSProperties;
  inputs?: React.CSSProperties;
  subHeader?: React.CSSProperties;
}

export interface OTPFormProps {
  name?: string;
  title?: string;
  value: string[];
  length?: number;
  loading?: boolean;
  ariaLabel?: string;
  isNumeric?: boolean;
  style?: OTPFormStylesProps;
  className?: OTPFormClassNamesProps;
  onChange: (value: string[]) => void;
}

export interface OtpInputProps {
  name?: string;
  index: number;
  value: string;
  length: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  inputRef: (el: HTMLInputElement | null) => void;
  onChange: (value: string, index: number) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

export interface OtpInputListProps {
  name?: string;
  length: number;
  value: string[];
  disabled?: boolean;
  style?: OTPFormStylesProps;
  className?: OTPFormClassNamesProps;
  inputsRef: React.RefObject<HTMLInputElement[]>;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  onChange: (value: string, index: number) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

export interface UseOtpForm {
  length: number;
  value: string[];
  isNumeric: boolean;
  onChange: (value: string[]) => void;
}

export interface UseOtpFormReturn {
  inputsRef: React.RefObject<HTMLInputElement[]>;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleChange: (value: string, index: number) => void;
  handlePaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}
