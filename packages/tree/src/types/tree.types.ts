/* eslint-disable @typescript-eslint/no-explicit-any */
export type TreeMode = "single" | "multiple";
export type NodeValue = number | string;
export type TreeValue<Mode extends TreeMode = "single"> =
  Mode extends "multiple" ? NodeValue[] : NodeValue | null;

export interface TreeNode {
  value: NodeValue;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface CheckInfo {
  checked: boolean;
  node: TreeNode;
  checkedValues: NodeValue[];
  halfCheckedValues: NodeValue[];
}

interface BaseTreeProps {
  treeData: TreeNode[];
  name?: string;
  label?: string;
  error?: any;
  disabled?: boolean;
  isRequired?: boolean;
  showIcon?: boolean;
  showLine?: boolean;
  showSearch?: boolean;
  highlightMatch?: boolean;
  searchPlaceholder?: string;
  notFoundText?: string;
  emptyText?: string;
  autoExpandParent?: boolean;
  defaultExpandedValues?: NodeValue[];
  expandedValues?: NodeValue[];
  onExpand?: (expandedValues: NodeValue[], node: TreeNode) => void;
  style?: TreeStyles;
  className?: TreeClassNames;
}

export interface SelectTreeProps<
  Mode extends TreeMode = "single",
> extends BaseTreeProps {
  checkable?: false;
  mode?: Mode;
  value: TreeValue<Mode>;
  onChange?: (value: TreeValue<Mode>, node?: TreeNode) => void;
}

export interface CheckableTreeProps extends BaseTreeProps {
  checkable: true;
  checkStrictly?: boolean;
  value: NodeValue[];
  onChange?: (value: NodeValue[], node?: TreeNode, info?: CheckInfo) => void;
}

export type TreeProps<Mode extends TreeMode = "single"> =
  | SelectTreeProps<Mode>
  | CheckableTreeProps;

export interface TreeNodeProps {
  node: TreeNode;
  depth: number;
  treeId: string;
  showIcon?: boolean;
  showLine?: boolean;
  checkable?: boolean;
  disabled?: boolean;
  query: string;
  highlightMatch?: boolean;
  activeValue?: NodeValue;
  matchedValues: Set<NodeValue>;
  selectedValues: Set<NodeValue>;
  checkedValues: Set<NodeValue>;
  indeterminateValues: Set<NodeValue>;
  expandedValues: Set<NodeValue>;
  style?: TreeStyles;
  className?: TreeClassNames;
  onToggleExpand: (node: TreeNode) => void;
  onSelect: (node: TreeNode) => void;
  onCheck: (node: TreeNode) => void;
}

export interface TreeClassNames {
  root?: string;
  search?: string;
  tree?: string;
  node?: string;
  nodeContent?: string;
  label?: string;
  checkbox?: string;
  expandIcon?: string;
}

export interface TreeStyles {
  root?: React.CSSProperties;
  search?: React.CSSProperties;
  tree?: React.CSSProperties;
  node?: React.CSSProperties;
  nodeContent?: React.CSSProperties;
  label?: React.CSSProperties;
  checkbox?: React.CSSProperties;
  expandIcon?: React.CSSProperties;
}

export interface EmptyStateProps {
  message?: string;
}

export interface TreeCheckboxProps {
  checked: boolean;
  indeterminate: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface TreeSearchProps {
  query: string;
  placeholder: string;
  disabled?: boolean;
  style?: TreeStyles;
  className?: TreeClassNames;
  setQuery: (value: string) => void;
}

export interface UseTreeStateParams {
  treeData: TreeNode[];
  query: string;
  defaultExpandedValues?: NodeValue[];
  expandedValues?: NodeValue[];
  autoExpandParent?: boolean;
  onExpand?: (expandedValues: NodeValue[], node: TreeNode) => void;
}

export interface NodeIndex {
  byValue: Map<NodeValue, TreeNode>;
  parentOf: Map<NodeValue, NodeValue | null>;
  depthOf: Map<NodeValue, number>;
}

export interface ComputedState {
  checked: Set<NodeValue>;
  indeterminate: Set<NodeValue>;
}

export interface FilterResult {
  tree: TreeNode[];
  expandedFromSearch: NodeValue[];
  matched: Set<NodeValue>;
}
