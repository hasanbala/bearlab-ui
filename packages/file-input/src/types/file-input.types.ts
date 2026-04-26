export interface FileInputClassNames {
  root?: string;
  label?: string;
  input?: string;
  helperText?: string;
  errorMessage?: string;
}

export interface FileInputStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  input?: React.CSSProperties;
  helperText?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}

export interface FileInputProps {
  id?: string;
  name?: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  helperText?: string;
  isRequired?: boolean;
  style?: FileInputStyles;
  error?: boolean | string;
  className?: FileInputClassNames;
  inputRef?: React.Ref<HTMLInputElement>;
  capture?: boolean | "user" | "environment";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
