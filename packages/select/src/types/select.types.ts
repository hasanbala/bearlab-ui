export type SelectMode = "single" | "multiple";

export interface SelectOption {
  label: string;
  image?: string;
  disabled?: boolean;
  value: string | number;
}

export type SingleValue<T extends SelectOption> = T | string | number | null;

export type MultipleValue<T extends SelectOption> = T[] | string[] | number[];

export type SelectValue<T extends SelectOption> =
  | SingleValue<T>
  | MultipleValue<T>;

interface BaseSelectProps<T extends SelectOption> {
  options: T[];
  name?: string;
  label?: string;
  error?: any;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  emptyText?: string;
  notFoundText?: string;
  isLoading?: boolean;
  showImage?: boolean;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  optionZIndex?: number;
  style?: SelectStyles;
  className?: SelectClassNames;
}

export interface SingleSelectProps<
  T extends SelectOption,
> extends BaseSelectProps<T> {
  mode?: "single";
  value?: SingleValue<T>;
  onChange?: (value: T | null) => void;
}

export interface MultipleSelectProps<
  T extends SelectOption,
> extends BaseSelectProps<T> {
  mode: "multiple";
  value?: MultipleValue<T>;
  onChange?: (value: T[]) => void;
}

export type SelectProps<T extends SelectOption> =
  | SingleSelectProps<T>
  | MultipleSelectProps<T>;

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
  disabled?: boolean;
  isLoading?: boolean;
  listboxId: string;
  emptyText?: string;
  selectedItems: T[];
  showImage?: boolean;
  activeIndex: number;
  style?: SelectStyles;
  notFoundText?: string;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  className?: SelectClassNames;
  isDropdownVisible: boolean;
  onSelect: (item: T) => void;
}

export interface SearchProps<T extends SelectOption> {
  error?: any;
  query: string;
  inputId: string;
  listboxId: string;
  selectedItems: T[];
  disabled?: boolean;
  isLoading?: boolean;
  placeholder: string;
  style?: SelectStyles;
  containerWidth: number;
  isDropdownVisible: boolean;
  className?: SelectClassNames;
  activeOptionId: string | undefined;
  mode: SelectMode;
  setQuery: (val: string) => void;
  onChange?: (val: T[]) => void;
  setIsDropdownVisible: (val: boolean) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SelectedItemsProps<T extends SelectOption> {
  disabled?: boolean;
  selectedItems: T[];
  style?: SelectStyles;
  visibleCount: number;
  className?: SelectClassNames;
  setSelectedItems: (val: T[]) => void;
}

export interface SelectedItemProps {
  title: string;
  disabled?: boolean;
  className?: string;
  value?: number | string;
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
