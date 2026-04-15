import type { CSSProperties, TextareaHTMLAttributes } from "react";

export interface TextareaClassNames {
  root?: string;
  label?: string;
  requiredMark?: string;
  textareaWrapper?: string;
  textarea?: string;
  errorMessage?: string;
}

export interface TextareaStyles {
  root?: CSSProperties;
  label?: CSSProperties;
  requiredMark?: CSSProperties;
  textareaWrapper?: CSSProperties;
  textarea?: CSSProperties;
  errorMessage?: CSSProperties;
}

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className" | "style"
> {
  error?: boolean | string;
  label?: string;
  isRequired?: boolean;
  id?: string;
  className?: TextareaClassNames;
  style?: TextareaStyles;
}
