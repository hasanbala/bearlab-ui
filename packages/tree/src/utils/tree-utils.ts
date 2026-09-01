import {
  ComputedState,
  FilterResult,
  NodeIndex,
  NodeValue,
  TreeNode,
} from "../types/tree.types";

export const isLeaf = (node: TreeNode): boolean =>
  !node.children || node.children.length === 0;

export const buildNodeIndex = (treeData: TreeNode[]): NodeIndex => {
  const byValue = new Map<NodeValue, TreeNode>();
  const parentOf = new Map<NodeValue, NodeValue | null>();
  const depthOf = new Map<NodeValue, number>();

  const walk = (nodes: TreeNode[], parent: NodeValue | null, depth: number) => {
    for (const node of nodes) {
      if (byValue.has(node.value)) continue;
      byValue.set(node.value, node);
      parentOf.set(node.value, parent);
      depthOf.set(node.value, depth);
      if (node.children?.length) {
        walk(node.children, node.value, depth + 1);
      }
    }
  };

  walk(treeData, null, 0);
  return { byValue, parentOf, depthOf };
};

export const collectAllLeaves = (node: TreeNode): TreeNode[] => {
  if (isLeaf(node)) return [node];
  return node.children!.flatMap(collectAllLeaves);
};

export const collectEnabledLeaves = (node: TreeNode): TreeNode[] => {
  if (node.disabled) return [];
  if (isLeaf(node)) return [node];
  return node.children!.flatMap(collectEnabledLeaves);
};

export const computeCheckedAndIndeterminate = (
  treeData: TreeNode[],
  value: NodeValue[]
): ComputedState => {
  const valueSet = new Set(value);
  const checked = new Set<NodeValue>();
  const indeterminate = new Set<NodeValue>();

  const visit = (
    node: TreeNode
  ): { checked: boolean; indeterminate: boolean } => {
    if (isLeaf(node)) {
      const isChecked = valueSet.has(node.value);
      if (isChecked) checked.add(node.value);
      return { checked: isChecked, indeterminate: false };
    }

    const enabledChildren = node.children!.filter((c) => !c.disabled);

    const childStates = node.children!.map((child) => ({
      child,
      state: visit(child),
    }));

    if (enabledChildren.length === 0) {
      const isChecked = valueSet.has(node.value);
      if (isChecked) checked.add(node.value);
      return { checked: isChecked, indeterminate: false };
    }

    const enabledStates = childStates.filter((cs) => !cs.child.disabled);
    const allChecked = enabledStates.every((cs) => cs.state.checked);
    const someActive = enabledStates.some(
      (cs) => cs.state.checked || cs.state.indeterminate
    );

    if (allChecked) {
      checked.add(node.value);
      return { checked: true, indeterminate: false };
    }
    if (someActive) {
      indeterminate.add(node.value);
      return { checked: false, indeterminate: true };
    }
    return { checked: false, indeterminate: false };
  };

  treeData.forEach(visit);
  return { checked, indeterminate };
};

export const toggleChecked = (
  treeData: TreeNode[],
  currentChecked: Set<NodeValue>,
  node: TreeNode,
  checkStrictly: boolean
): NodeValue[] => {
  if (checkStrictly) {
    const next = new Set(currentChecked);
    if (next.has(node.value)) next.delete(node.value);
    else next.add(node.value);
    return Array.from(next);
  }

  const nextChecked = !currentChecked.has(node.value);

  const allLeaves = treeData.flatMap(collectAllLeaves);
  const leafChecked = new Set(
    allLeaves.filter((l) => currentChecked.has(l.value)).map((l) => l.value)
  );

  const affected = collectEnabledLeaves(node).map((l) => l.value);
  for (const v of affected) {
    if (nextChecked) leafChecked.add(v);
    else leafChecked.delete(v);
  }

  const { checked } = computeCheckedAndIndeterminate(
    treeData,
    Array.from(leafChecked)
  );
  return Array.from(checked);
};

export const flattenVisibleNodes = (
  treeData: TreeNode[],
  expanded: Set<NodeValue>
): Array<{ node: TreeNode; depth: number }> => {
  const result: Array<{ node: TreeNode; depth: number }> = [];

  const walk = (nodes: TreeNode[], depth: number) => {
    for (const node of nodes) {
      result.push({ node, depth });
      if (!isLeaf(node) && expanded.has(node.value)) {
        walk(node.children!, depth + 1);
      }
    }
  };

  walk(treeData, 0);
  return result;
};

export const filterTree = (
  treeData: TreeNode[],
  query: string
): FilterResult => {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { tree: treeData, expandedFromSearch: [], matched: new Set() };
  }

  const matched = new Set<NodeValue>();
  const expandedFromSearch: NodeValue[] = [];

  const markMatches = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      if (node.label.toLowerCase().includes(q)) matched.add(node.value);
      if (node.children?.length) markMatches(node.children);
    }
  };

  const walk = (nodes: TreeNode[]): TreeNode[] => {
    const out: TreeNode[] = [];
    for (const node of nodes) {
      const selfMatch = node.label.toLowerCase().includes(q);
      if (selfMatch) {
        matched.add(node.value);
        if (node.children?.length) markMatches(node.children);
        out.push(node);
        continue;
      }
      const filteredChildren = node.children ? walk(node.children) : [];
      if (filteredChildren.length > 0) {
        expandedFromSearch.push(node.value);
        out.push({ ...node, children: filteredChildren });
      }
    }
    return out;
  };

  return { tree: walk(treeData), expandedFromSearch, matched };
};

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (text: string): string =>
  text.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);

export const highlightLabelHtml = (label: string, query: string): string => {
  const q = query.trim();
  if (!q) return escapeHtml(label);

  const pattern = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return label
    .split(new RegExp(`(${pattern})`, "gi"))
    .map((part, index) =>
      index % 2 === 1
        ? `<strong>${escapeHtml(part)}</strong>`
        : escapeHtml(part)
    )
    .join("");
};
