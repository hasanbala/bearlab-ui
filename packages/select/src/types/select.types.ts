export type SelectMode = "single" | "multiple";
export type SingleValue<T extends SelectOption> = T["value"] | null;
export type MultipleValue<T extends SelectOption> = T["value"][];
export type SelectValue<
  T extends SelectOption,
  Mode extends SelectMode = "single",
> = Mode extends "multiple" ? MultipleValue<T> : SingleValue<T>;

export interface SelectProps<
  T extends SelectOption,
  Mode extends SelectMode = "single",
> extends BaseSelectProps<T> {
  mode?: Mode;
  value: SelectValue<T, Mode>;
  onChange?: (value: SelectValue<T, Mode>, option?: T) => void;
}

export interface SelectOption {
  label: string;
  image?: string;
  disabled?: boolean;
  value: number | string;
}

interface BaseSelectProps<T extends SelectOption> {
  error?: any;
  options: T[];
  name?: string;
  label?: string;
  disabled?: boolean;
  emptyText?: string;
  isLoading?: boolean;
  showImage?: boolean;
  style?: SelectStyles;
  isRequired?: boolean;
  placeholder?: string;
  notFoundText?: string;
  optionZIndex?: number;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  className?: SelectClassNames;
}

export interface OptionProps {
  label: string;
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
  listboxId: string;
  emptyText?: string;
  disabled?: boolean;
  selectedItems: T[];
  isLoading?: boolean;
  isMultiple: boolean;
  showImage?: boolean;
  activeIndex: number;
  style?: SelectStyles;
  notFoundText?: string;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  isDropdownVisible: boolean;
  className?: SelectClassNames;
  onSelect: (item: T) => void;
}

export interface SearchProps<T extends SelectOption> {
  error?: any;
  query: string;
  inputId: string;
  mode: SelectMode;
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
  onChange?: (val: T[]) => void;
  setQuery: (val: string) => void;
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
  optionZIndex: number;
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export interface SelectClassNames {
  root?: string;
  search?: string;
  option?: string;
  options?: string;
  selectedItem?: string;
  selectedItems?: string;
}

export interface SelectStyles {
  root?: React.CSSProperties;
  search?: React.CSSProperties;
  option?: React.CSSProperties;
  options?: React.CSSProperties;
  selectedItem?: React.CSSProperties;
  selectedItems?: React.CSSProperties;
}
