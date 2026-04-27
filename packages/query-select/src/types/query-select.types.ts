export type QuerySelectMode = "single" | "multiple";
export type SelectionDisplay = "card" | "inline";
export type SingleValue<T extends QuerySelectOption> = T["value"] | null;
export type MultipleValue<T extends QuerySelectOption> = T["value"][];
export type QuerySelectValue<
  T extends QuerySelectOption,
  Mode extends QuerySelectMode = "single",
> = Mode extends "multiple" ? MultipleValue<T> : SingleValue<T>;

export interface QuerySelectProps<
  T extends QuerySelectOption,
  Mode extends QuerySelectMode = "single",
> extends BaseQuerySelectProps<T> {
  mode?: Mode;
  value: QuerySelectValue<T, Mode>;
  onChange?: (value: QuerySelectValue<T, Mode>, option?: T) => void;
}

export interface QuerySelectOption {
  label: string;
  image?: string;
  disabled?: boolean;
  value: string | number;
}

export interface BaseQuerySelectProps<T extends QuerySelectOption> {
  error?: any;
  name?: string;
  label?: string;
  disabled?: boolean;
  delayTime?: number;
  emptyText?: string;
  minLength?: number;
  showImage?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  notFoundText?: string;
  optionZIndex?: number;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  noSelectionText?: string;
  style?: QuerySelectStyles;
  className?: QuerySelectClassNames;
  selectionLayout?: SelectionDisplay;
  onSearch: (query: string) => Promise<T[]>;
}

export interface QuerySelectSelectionCardItemsProps<
  T extends QuerySelectOption,
> {
  disabled?: boolean;
  selectedItems: T[];
  noSelectionText?: string;
  style?: QuerySelectStyles;
  isDropdownVisible: boolean;
  className?: QuerySelectClassNames;
  onRemoveSelect: (val: T[]) => void;
}

export interface QuerySelectSelectionInlineItemProps {
  title: string;
  disabled?: boolean;
  value?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onRemove?: (item: string | number) => void;
}

export interface QuerySelectSearchProps<T extends QuerySelectOption> {
  error?: any;
  query: string;
  inputId: string;
  listboxId: string;
  isSingle: boolean;
  isLoading: boolean;
  minLength?: number;
  selectedItems: T[];
  disabled?: boolean;
  placeholder: string;
  debouncedValue: string;
  containerWidth: number;
  isSelectionCard: boolean;
  style?: QuerySelectStyles;
  isDropdownVisible: boolean;
  className?: QuerySelectClassNames;
  activeOptionId: string | undefined;
  onChange?: (val: T[]) => void;
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
  minLength?: number;
  showImage?: boolean;
  activeIndex: number;
  isMultiple: boolean;
  notFoundText?: string;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  style?: QuerySelectStyles;
  isDropdownVisible: boolean;
  className?: QuerySelectClassNames;
  onSelect: (item: T) => void;
}

export interface QuerySelectOptionProps {
  label: string;
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
  optionZIndex: number;
  isSelectionCard: boolean;
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export interface QuerySelectSelectionInlineItemsProps<
  T extends QuerySelectOption,
> {
  disabled?: boolean;
  selectedItems: T[];
  visibleCount: number;
  style?: QuerySelectStyles;
  className?: QuerySelectClassNames;
  setSelectedItems: (val: T[]) => void;
}

export interface QuerySelectClassNames {
  root?: string;
  search?: string;
  option?: string;
  options?: string;
  selectionCardItem?: string;
  selectionCardItems?: string;
  selectionInlineItem?: string;
  selectionCardWrapper?: string;
  selectionInlineItems?: string;
}

export interface QuerySelectStyles {
  root?: React.CSSProperties;
  search?: React.CSSProperties;
  option?: React.CSSProperties;
  options?: React.CSSProperties;
  selectionCardItem?: React.CSSProperties;
  selectionCardItems?: React.CSSProperties;
  selectionInlineItem?: React.CSSProperties;
  selectionCardWrapper?: React.CSSProperties;
  selectionInlineItems?: React.CSSProperties;
}

export interface QuerySelectSelectionCardItemProps {
  title: string;
  disabled?: boolean;
  className?: string;
  value?: string | number;
  style?: React.CSSProperties;
  onRemove?: (item: string | number) => void;
}

export interface OptionsLoadingSkeletonProps {
  rows: number;
  showImage: boolean;
  showCheckbox: boolean;
}

export interface SkeletonRowProps {
  showImage: boolean;
  showCheckbox: boolean;
}
