export interface QuerySelectOption {
  label: string;
  image?: string;
  disabled?: boolean;
  value: string | number;
}

export interface QuerySelectProps<T extends QuerySelectOption> {
  error?: any;
  query: string;
  label?: string;
  disabled?: boolean;
  selectedItems: T[];
  delayTime?: number;
  emptyText?: string;
  showImage?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  notFoundText?: string;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  noSelectionText?: string;
  queryPlaceholder?: string;
  persistedItems?: T[];
  minLength?: number;
  style?: QuerySelectStyles;
  className?: QuerySelectClassNames;
  onChange?: (selected: T[]) => void;
  setQuery: (value: string) => void;
  onSearch: (query: string) => Promise<T[]>;
  setSelectedItems: (selected: T[]) => void;
  onPersistedItemsChange?: (recorded: T[]) => void;
}

export interface QuerySelectSelectedItemsProps<T extends QuerySelectOption> {
  disabled?: boolean;
  selectedItems: T[];
  noSelectionText?: string;
  persistedItems?: T[];
  style?: QuerySelectStyles;
  className?: QuerySelectClassNames;
  setSelectedItems: (selected: T[]) => void;
  onPersistedItemsChange?: (recorded: T[]) => void;
}

export interface QuerySelectSelectedItemProps {
  title: string;
  disabled?: boolean;
  value: string | number;
  isRecorded: boolean | undefined;
  style?: QuerySelectStyles;
  className?: QuerySelectClassNames;
  onRemove?: (item: string | number) => void;
}

export interface QuerySelectSearchProps<T extends QuerySelectOption> {
  query: string;
  inputId: string;
  error?: any;
  listboxId: string;
  disabled?: boolean;
  isLoading: boolean;
  placeholder: string;
  debouncedValue: string;
  isDropdownVisible: boolean;
  minLength?: number;
  style?: QuerySelectStyles;
  activeOptionId: string | undefined;
  className?: QuerySelectClassNames;
  setOptions: (val: T[]) => void;
  setQuery: (val: string) => void;
  setIsDropdownVisible: (val: boolean) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface QuerySelectOptionsProps<T extends QuerySelectOption> {
  options: T[];
  query: string;
  listboxId: string;
  isLoading: boolean;
  disabled?: boolean;
  emptyText?: string;
  selectedItems: T[];
  showImage?: boolean;
  activeIndex: number;
  notFoundText?: string;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  isDropdownVisible: boolean;
  minLength?: number;
  style?: QuerySelectStyles;
  className?: QuerySelectClassNames;
  onSelect: (item: T) => void;
}

export interface QuerySelectOptionProps {
  name: string;
  image?: string;
  optionId: string;
  isActive: boolean;
  dataIndex: number;
  disabled?: boolean;
  isSelected: boolean;
  showImage?: boolean;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  emphasizedValue?: string;
  style?: QuerySelectStyles;
  className?: QuerySelectClassNames;
  onSelect: () => void;
}

export interface QuerySelectOptionsPortalProps {
  isVisible: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export interface QuerySelectClassNames {
  search?: string;
  option?: string;
  options?: string;
  root?: string;
  selectedItem?: string;
  selectedItems?: string;
}

export interface QuerySelectStyles {
  search?: React.CSSProperties;
  option?: React.CSSProperties;
  options?: React.CSSProperties;
  root?: React.CSSProperties;
  selectedItem?: React.CSSProperties;
  selectedItems?: React.CSSProperties;
}
