export interface DropzoneClassNames {
  root?: string;
  icon?: string;
  list?: string;
  item?: string;
  title?: string;
  input?: string;
  browse?: string;
  content?: string;
  subtitle?: string;
}

export interface DropzoneStyles {
  item?: React.CSSProperties;
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
  list?: React.CSSProperties;
  title?: React.CSSProperties;
  input?: React.CSSProperties;
  browse?: React.CSSProperties;
  content?: React.CSSProperties;
  subtitle?: React.CSSProperties;
}

export interface DropzoneProps {
  name?: string;
  accept?: string;
  title?: string;
  subTitle?: string;
  multiple?: boolean;
  isLoading?: boolean;
  browseText?: string;
  "aria-label"?: string;
  style?: DropzoneStyles;
  className?: DropzoneClassNames;
  files: FileList | File[] | null;
  setFiles: (val: FileList | File[] | null) => void;
}

export interface DropzoneListProps {
  isLoading?: boolean;
  style?: DropzoneStyles;
  className?: DropzoneClassNames;
  files: FileList | File[] | null;
  onRemoveFile: (name: string) => void;
}

export interface DropzoneItemProps {
  file: File;
  index: number;
  className?: string;
  isLoading?: boolean;
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
