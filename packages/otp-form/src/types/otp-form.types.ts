export interface OTPFormSubComponentProps {
  root?: string;
  subHeader?: string;
  inputs?: string;
  input?: string;
}

export interface OTPFormSubComponentStyles {
  root?: React.CSSProperties;
  subHeader?: React.CSSProperties;
  inputs?: React.CSSProperties;
  input?: React.CSSProperties;
}

export interface OTPFormProps {
  onChange: (value: string[]) => void;
  value: string[];
  loading?: boolean;
  title?: string;
  isNumeric?: boolean;
  length?: number;
  ariaLabel?: string;
  className?: OTPFormSubComponentProps;
  style?: OTPFormSubComponentStyles;
}

export interface OtpInputProps {
  index: number;
  value: string;
  disabled?: boolean;
  length: number;
  className?: string;
  style?: React.CSSProperties;
  inputRef: (el: HTMLInputElement | null) => void;
  onChange: (value: string, index: number) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

export interface OtpInputListProps {
  value: string[];
  length: number;
  disabled?: boolean;
  inputsRef: React.RefObject<HTMLInputElement[]>;
  className?: OTPFormSubComponentProps;
  style?: OTPFormSubComponentStyles;
  onChange: (value: string, index: number) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

export interface UseOtpForm {
  value: string[];
  onChange: (value: string[]) => void;
  isNumeric: boolean;
  length: number;
}

export interface UseOtpFormReturn {
  inputsRef: React.RefObject<HTMLInputElement[]>;
  handleChange: (value: string, index: number) => void;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  handlePaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}
