export type SelectMode = "single" | "multiple";

export interface SelectOption {
  label: string;
  image?: string;
  disabled?: boolean;
  value: string | number;
}

export interface SelectProps<T extends SelectOption> {
  error?: any;
  options: T[];
  query: string;
  label?: string;
  mode?: SelectMode;
  disabled?: boolean;
  isLoading: boolean;
  selectedItems: T[];
  emptyText?: string;
  showImage?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  style?: SelectStyles;
  notFoundText?: string;
  optionZIndex?: number;
  debouncedValue: string;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  className?: SelectClassNames;
  setOptions: (val: T[]) => void;
  setQuery: (val: string) => void;
  onChange?: (selected: T[]) => void;
  setSelectedItems: (selected: T[]) => void;
}

export interface OptionProps {
  name: string;
  image?: string;
  optionId: string;
  isActive: boolean;
  dataIndex: number;
  disabled?: boolean;
  isSelected: boolean;
  showImage?: boolean;
  style?: SelectStyles;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  emphasizedValue?: string;
  className?: SelectClassNames;
  onSelect: () => void;
}

export interface OptionsProps<T extends SelectOption> {
  options: T[];
  query: string;
  mode: SelectMode;
  isLoading: boolean;
  listboxId: string;
  disabled?: boolean;
  emptyText?: string;
  selectedItems: T[];
  showImage?: boolean;
  activeIndex: number;
  style?: SelectStyles;
  notFoundText?: string;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  className?: SelectClassNames;
  onSelect: (item: T) => void;
}

export interface SearchProps<T extends SelectOption> {
  error?: any;
  query: string;
  inputId: string;
  listboxId: string;
  selectedItems: T[];
  disabled?: boolean;
  isLoading: boolean;
  placeholder: string;
  style?: SelectStyles;
  debouncedValue: string;
  containerWidth: number;
  isDropdownVisible: boolean;
  className?: SelectClassNames;
  activeOptionId: string | undefined;
  setOptions: (val: T[]) => void;
  setQuery: (val: string) => void;
  setSelectedItems: (val: T[]) => void;
  setIsDropdownVisible: (val: boolean) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SelectedItemsProps<T extends SelectOption> {
  disabled?: boolean;
  selectedItems: T[];
  style?: SelectStyles;
  visibleCount: number;
  className?: SelectClassNames;
  selectedItemsRef: React.RefObject<HTMLDivElement | null>;
  setSelectedItems: (val: T[]) => void;
}

export interface SelectedItemProps {
  title: string;
  disabled?: boolean;
  className?: string;
  id?: number | string;
  style?: React.CSSProperties;
  onRemove?: (val: number | string) => void;
}

export interface OptionsPortalProps {
  isVisible: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement | null>;
  optionZIndex: number;
}

export interface SelectClassNames {
  search?: string;
  option?: string;
  options?: string;
  root?: string;
  selectedItem?: string;
  selectedItems?: string;
}

export interface SelectStyles {
  search?: React.CSSProperties;
  option?: React.CSSProperties;
  options?: React.CSSProperties;
  root?: React.CSSProperties;
  selectedItem?: React.CSSProperties;
  selectedItems?: React.CSSProperties;
}
