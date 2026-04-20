export type SelectMode = "single" | "multiple";
export type SelectionDisplay = "card" | "inline";

export interface QuerySelectOption {
  label: string;
  image?: string;
  disabled?: boolean;
  value: string | number;
}

export type SingleValue<T extends QuerySelectOption> =
  | T
  | string
  | number
  | null;

export type MultipleValue<T extends QuerySelectOption> =
  | T[]
  | string[]
  | number[];

export type QuerySelectValue<T extends QuerySelectOption> =
  | SingleValue<T>
  | MultipleValue<T>;

export interface BaseQuerySelectProps<T extends QuerySelectOption> {
  error?: any;
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
  selectionDisplay?: SelectionDisplay;
  onSearch: (query: string) => Promise<T[]>;
}

export interface SingleQuerySelectProps<
  T extends QuerySelectOption,
> extends BaseQuerySelectProps<T> {
  mode?: "single";
  value?: SingleValue<T>;
  onChange?: (value: T | null) => void;
}

export interface MultipleQuerySelectProps<
  T extends QuerySelectOption,
> extends BaseQuerySelectProps<T> {
  mode: "multiple";
  value?: MultipleValue<T>;
  onChange?: (value: T[]) => void;
}

export type QuerySelectProps<T extends QuerySelectOption> =
  | SingleQuerySelectProps<T>
  | MultipleQuerySelectProps<T>;

export interface QuerySelectSelectionCardItemsProps<
  T extends QuerySelectOption,
> {
  disabled?: boolean;
  selectedItems: T[];
  noSelectionText?: string;
  style?: QuerySelectStyles;
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
  mode: SelectMode;
  listboxId: string;
  selectedItems: T[];
  minLength?: number;
  disabled?: boolean;
  isLoading: boolean;
  placeholder: string;
  debouncedValue: string;
  containerWidth: number;
  style?: QuerySelectStyles;
  isDropdownVisible: boolean;
  className?: QuerySelectClassNames;
  activeOptionId: string | undefined;
  selectionDisplay: SelectionDisplay;
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
  optionZIndex: number;
}

export interface QuerySelectSelectionInlineItemsProps<
  T extends QuerySelectOption,
> {
  disabled?: boolean;
  selectedItems: T[];
  style?: QuerySelectStyles;
  visibleCount: number;
  className?: QuerySelectClassNames;
  setSelectedItems: (val: T[]) => void;
}

export interface QuerySelectClassNames {
  search?: string;
  option?: string;
  options?: string;
  root?: string;
  selectionCardItem?: string;
  selectionCardItems?: string;
  selectionCardWrapper?: string;
  selectionInlineItems?: string;
  selectionInlineItem?: string;
}

export interface QuerySelectStyles {
  search?: React.CSSProperties;
  option?: React.CSSProperties;
  options?: React.CSSProperties;
  root?: React.CSSProperties;
  selectionCardItem?: React.CSSProperties;
  selectionCardItems?: React.CSSProperties;
  selectionCardWrapper?: React.CSSProperties;
  selectionInlineItems?: React.CSSProperties;
  selectionInlineItem?: React.CSSProperties;
}

export interface QuerySelectSelectionCardItemProps {
  title: string;
  disabled?: boolean;
  value?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onRemove?: (item: string | number) => void;
}
