export interface TextareaClassNames {
  root?: string;
  label?: string;
  textarea?: string;
  requiredMark?: string;
  errorMessage?: string;
  textareaWrapper?: string;
}

export interface TextareaStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  requiredMark?: React.CSSProperties;
  textareaWrapper?: React.CSSProperties;
  textarea?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className" | "style"
> {
  id?: string;
  label?: string;
  isRequired?: boolean;
  style?: TextareaStyles;
  error?: boolean | string;
  className?: TextareaClassNames;
}
