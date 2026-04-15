export type TagFormat = "domain" | "email" | "custom";

export type TagStatus = "valid" | "invalid";

export interface TagItem {
  id: string;
  value: string;
  status: TagStatus;
}

export interface TagInputClassNames {
  list?: string;
  tag?: string;
  input?: string;
  tagValid?: string;
  tagLabel?: string;
  root?: string;
  tagRemove?: string;
  tagInvalid?: string;
  helperText?: string;
}

export interface TagInputStyles {
  tag?: React.CSSProperties;
  list?: React.CSSProperties;
  input?: React.CSSProperties;
  tagValid?: React.CSSProperties;
  tagLabel?: React.CSSProperties;
  tagRemove?: React.CSSProperties;
  root?: React.CSSProperties;
  tagInvalid?: React.CSSProperties;
  helperText?: React.CSSProperties;
}

export interface TagInputProps {
  label?: string;
  maxItems?: number;
  inputValue: string;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  helperText?: string;
  value: TagItem[];
  format: TagFormat;
  error?: boolean | string;
  allowDuplicates?: boolean;
  style?: TagInputStyles;
  className?: TagInputClassNames;
  formatLabel?: string;
  onError?: (value: string) => void;
  validate?: (value: string) => boolean;
  onAdd?: (item: TagItem) => void;
  onInputChange: (value: string) => void;
  onRemove?: (item: TagItem) => void;
  onChange: (items: TagItem[]) => void;
}

export interface UseTagInputProps {
  onBlur?: boolean;
  maxItems?: number;
  inputValue: string;
  disabled?: boolean;
  value: TagItem[];
  format: TagFormat;
  allowDuplicates?: boolean;
  formatLabel?: string;
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
  disabled?: boolean;
  item: TagItem;
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
  nextList: TagItem[] | null;
  announcement: string | null;
  item: TagItem | null;
  reason: "added" | "duplicate" | "empty" | "max-reached" | null;
}
