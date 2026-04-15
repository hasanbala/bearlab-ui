import type React from "react";

export interface FileInputClassNames {
  root?: string;
  label?: string;
  input?: string;
  errorText?: string;
  helperText?: string;
}

export interface FileInputStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  input?: React.CSSProperties;
  errorText?: React.CSSProperties;
  helperText?: React.CSSProperties;
}

export interface FileInputProps {
  id?: string;
  name?: string;
  label?: string;
  error?: boolean | string;
  helperText?: string;
  isRequired?: boolean;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  capture?: boolean | "user" | "environment";
  inputRef?: React.Ref<HTMLInputElement>;
  className?: FileInputClassNames;
  style?: FileInputStyles;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
