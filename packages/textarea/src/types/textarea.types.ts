export type TextareaValue =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>["value"];

export interface TextareaClassNames {
  root?: string;
  label?: string;
  textarea?: string;
  requiredMark?: string;
  errorMessage?: string;
  characterCount?: string;
  textareaWrapper?: string;
}

export interface TextareaStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  requiredMark?: React.CSSProperties;
  textareaWrapper?: React.CSSProperties;
  textarea?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
  characterCount?: React.CSSProperties;
}

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className" | "style"
> {
  id?: string;
  label?: string;
  isRequired?: boolean;
  maxCharacter?: number;
  style?: TextareaStyles;
  error?: boolean | string;
  className?: TextareaClassNames;
}

export interface UseCharacterLimitProps {
  value?: TextareaValue;
  maxCharacter?: number;
  defaultValue?: TextareaValue;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export interface UseCharacterLimitReturn {
  limit?: number;
  characterCount: number;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
