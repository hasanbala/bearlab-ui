/* eslint-disable @typescript-eslint/no-explicit-any */
export type TreeSelectMode = "single" | "multiple";
export type NodeValue = number | string;

export interface TreeSelectOption {
  value: NodeValue;
  label: string;
  children?: TreeSelectOption[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type SingleValue = NodeValue | null;
export type MultipleValue = NodeValue[];
export type TreeSelectValue<Mode extends TreeSelectMode = "single"> =
  Mode extends "multiple" ? MultipleValue : SingleValue;

interface BaseTreeSelectProps {
  treeData: TreeSelectOption[];
  name?: string;
  label?: string;
  error?: any;
  disabled?: boolean;
  isRequired?: boolean;
  isLoading?: boolean;
  showIcon?: boolean;
  showLine?: boolean;
  checkStrictly?: boolean;
  highlightMatch?: boolean;
  placeholder?: string;
  notFoundText?: string;
  emptyText?: string;
  optionZIndex?: number;
  autoExpandParent?: boolean;
  defaultExpandedValues?: NodeValue[];
  expandedValues?: NodeValue[];
  onExpand?: (expandedValues: NodeValue[], node: TreeSelectOption) => void;
  style?: TreeSelectStyles;
  className?: TreeSelectClassNames;
}

export interface TreeSelectProps<
  Mode extends TreeSelectMode = "single",
> extends BaseTreeSelectProps {
  mode?: Mode;
  value: TreeSelectValue<Mode>;
  onChange?: (value: TreeSelectValue<Mode>, node?: TreeSelectOption) => void;
}

export interface TreeOptionsProps {
  treeId: string;
  listboxId: string;
  query: string;
  mode: TreeSelectMode;
  treeData: TreeSelectOption[];
  disabled?: boolean;
  isLoading?: boolean;
  showIcon?: boolean;
  showLine?: boolean;
  highlightMatch?: boolean;
  emptyText?: string;
  notFoundText?: string;
  activeValue?: NodeValue;
  matchedValues: Set<NodeValue>;
  selectedValues: Set<NodeValue>;
  checkedValues: Set<NodeValue>;
  indeterminateValues: Set<NodeValue>;
  expandedValues: Set<NodeValue>;
  style?: TreeSelectStyles;
  className?: TreeSelectClassNames;
  onToggleExpand: (node: TreeSelectOption) => void;
  onSelect: (node: TreeSelectOption) => void;
}

export interface TreeOptionProps extends Omit<
  TreeOptionsProps,
  "treeData" | "listboxId" | "emptyText" | "notFoundText" | "isLoading"
> {
  node: TreeSelectOption;
  depth: number;
}

export interface SearchProps {
  error?: any;
  query: string;
  inputId: string;
  mode: TreeSelectMode;
  listboxId: string;
  selectedItems: TreeSelectOption[];
  disabled?: boolean;
  isLoading?: boolean;
  placeholder: string;
  style?: TreeSelectStyles;
  containerWidth: number;
  isDropdownVisible: boolean;
  className?: TreeSelectClassNames;
  activeOptionId: string | undefined;
  onChange?: (val: TreeSelectOption[]) => void;
  setQuery: (val: string) => void;
  setIsDropdownVisible: (val: boolean) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SelectedItemsProps {
  disabled?: boolean;
  selectedItems: TreeSelectOption[];
  style?: TreeSelectStyles;
  visibleCount: number;
  className?: TreeSelectClassNames;
  setSelectedItems: (val: TreeSelectOption[]) => void;
}

export interface SelectedItemProps {
  title: string;
  disabled?: boolean;
  className?: string;
  value?: NodeValue;
  style?: React.CSSProperties;
  "aria-label"?: string;
  "data-bearlab-tree-select-item"?: "visible" | "overflow";
  onRemove?: (val: NodeValue) => void;
}

export interface OptionsPortalProps {
  isVisible: boolean;
  optionZIndex: number;
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export interface TreeSelectClassNames {
  root?: string;
  search?: string;
  options?: string;
  option?: string;
  selectedItem?: string;
  selectedItems?: string;
  checkbox?: string;
  expandIcon?: string;
}

export interface TreeSelectStyles {
  root?: React.CSSProperties;
  search?: React.CSSProperties;
  options?: React.CSSProperties;
  option?: React.CSSProperties;
  selectedItem?: React.CSSProperties;
  selectedItems?: React.CSSProperties;
  checkbox?: React.CSSProperties;
  expandIcon?: React.CSSProperties;
}

export interface NodeIndex {
  byValue: Map<NodeValue, TreeSelectOption>;
  parentOf: Map<NodeValue, NodeValue | null>;
  depthOf: Map<NodeValue, number>;
}

export interface ComputedState {
  checked: Set<NodeValue>;
  indeterminate: Set<NodeValue>;
}

export interface FilterResult {
  tree: TreeSelectOption[];
  expandedFromSearch: NodeValue[];
  matched: Set<NodeValue>;
}
