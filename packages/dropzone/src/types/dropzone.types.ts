export interface DropzoneClassNames {
  root?: string;
  content?: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  browse?: string;
  input?: string;
  list?: string;
  item?: string;
}

export interface DropzoneStyles {
  root?: React.CSSProperties;
  content?: React.CSSProperties;
  icon?: React.CSSProperties;
  title?: React.CSSProperties;
  subtitle?: React.CSSProperties;
  browse?: React.CSSProperties;
  input?: React.CSSProperties;
  list?: React.CSSProperties;
  item?: React.CSSProperties;
}

export interface DropzoneProps {
  className?: DropzoneClassNames;
  style?: DropzoneStyles;
  accept?: string;
  multiple?: boolean;
  isLoading?: boolean;
  files: FileList | File[] | null;
  setFiles: (val: FileList | File[] | null) => void;
  title?: string;
  subTitle?: string;
  browseText?: string;
  "aria-label"?: string;
}

export interface DropzoneListProps {
  files: FileList | File[] | null;
  isLoading?: boolean;
  onRemoveFile: (name: string) => void;
  className?: DropzoneClassNames;
  style?: DropzoneStyles;
}

export interface DropzoneItemProps {
  file: File;
  index: number;
  isLoading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onRemove: (name: string) => void;
}

export interface UseDropzone {
  isLoading?: boolean;
  files: FileList | File[] | null;
  setFiles: (val: FileList | File[] | null) => void;
}

export interface UseDropzoneReturn {
  isDragging: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleRemoveFile: (name: string) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
