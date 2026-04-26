export type TagFormat = "domain" | "email" | "custom";
export type TagStatus = "valid" | "invalid";

export interface TagItem {
  id: string;
  value: string;
  status: TagStatus;
}

export interface TagInputClassNames {
  tag?: string;
  root?: string;
  list?: string;
  label?: string;
  input?: string;
  tagValid?: string;
  tagLabel?: string;
  tagRemove?: string;
  tagInvalid?: string;
  helperText?: string;
  errorMessage?: string;
}

export interface TagInputStyles {
  tag?: React.CSSProperties;
  root?: React.CSSProperties;
  list?: React.CSSProperties;
  label?: React.CSSProperties;
  input?: React.CSSProperties;
  tagValid?: React.CSSProperties;
  tagLabel?: React.CSSProperties;
  tagRemove?: React.CSSProperties;
  tagInvalid?: React.CSSProperties;
  helperText?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}

export interface TagInputProps {
  label?: string;
  value: TagItem[];
  maxItems?: number;
  format: TagFormat;
  inputValue: string;
  disabled?: boolean;
  helperText?: string;
  isRequired?: boolean;
  placeholder?: string;
  formatLabel?: string;
  style?: TagInputStyles;
  error?: boolean | string;
  allowDuplicates?: boolean;
  className?: TagInputClassNames;
  onAdd?: (item: TagItem) => void;
  onError?: (value: string) => void;
  onRemove?: (item: TagItem) => void;
  onChange: (items: TagItem[]) => void;
  validate?: (value: string) => boolean;
  onInputChange: (value: string) => void;
}

export interface UseTagInputProps {
  onBlur?: boolean;
  value: TagItem[];
  format: TagFormat;
  maxItems?: number;
  disabled?: boolean;
  inputValue: string;
  formatLabel?: string;
  allowDuplicates?: boolean;
  onError?: (value: string) => void;
  validate?: (value: string) => boolean;
  onAdd?: (item: TagItem) => void;
  onInputChange: (value: string) => void;
  onRemove?: (item: TagItem) => void;
  onChange: (items: TagItem[]) => void;
}

export interface UseTagInputReturn {
  listId: string;
  announcement: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleBlur: () => void;
  handleRemove: (item: TagItem) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

export interface TagProps {
  item: TagItem;
  disabled?: boolean;
  className?: Pick<
    TagInputClassNames,
    "tag" | "tagValid" | "tagInvalid" | "tagLabel" | "tagRemove"
  >;
  style?: Pick<
    TagInputStyles,
    "tag" | "tagValid" | "tagInvalid" | "tagLabel" | "tagRemove"
  >;
  onRemove: (item: TagItem) => void;
}

export interface CommitResult {
  item: TagItem | null;
  nextList: TagItem[] | null;
  announcement: string | null;
  reason: "added" | "duplicate" | "empty" | "max-reached" | null;
}
