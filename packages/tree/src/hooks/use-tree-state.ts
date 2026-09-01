import { useCallback, useMemo, useState } from "react";
import { NodeValue, TreeNode, UseTreeStateParams } from "../types/tree.types";
import {
  buildNodeIndex,
  filterTree,
  flattenVisibleNodes,
} from "../utils/tree-utils";

export const useTreeState = (params: UseTreeStateParams) => {
  const {
    treeData,
    query,
    defaultExpandedValues,
    expandedValues,
    autoExpandParent = true,
    onExpand,
  } = params;

  const [internalExpanded, setInternalExpanded] = useState<NodeValue[]>(
    defaultExpandedValues ?? []
  );
  const [searchCollapsed, setSearchCollapsed] = useState<Set<NodeValue>>(
    () => new Set()
  );
  const [lastQuery, setLastQuery] = useState(query);

  const isExpandControlled = expandedValues !== undefined;
  const expanded = isExpandControlled ? expandedValues! : internalExpanded;

  if (lastQuery !== query) {
    setLastQuery(query);
    if (!query.trim() && searchCollapsed.size) setSearchCollapsed(new Set());
  }

  const nodeIndex = useMemo(() => buildNodeIndex(treeData), [treeData]);

  const {
    tree: displayTree,
    expandedFromSearch,
    matched,
  } = useMemo(() => filterTree(treeData, query), [treeData, query]);

  const expandedSet = useMemo(() => {
    const set = new Set(expanded);
    if (query.trim() && autoExpandParent) {
      for (const v of expandedFromSearch) {
        if (!searchCollapsed.has(v)) set.add(v);
      }
    }
    return set;
  }, [expanded, expandedFromSearch, autoExpandParent, query, searchCollapsed]);

  const flat = useMemo(
    () => flattenVisibleNodes(displayTree, expandedSet),
    [displayTree, expandedSet]
  );

  const toggleExpand = useCallback(
    (node: TreeNode) => {
      const isOpen = expandedSet.has(node.value);
      const next = isOpen
        ? expanded.filter((v) => v !== node.value)
        : expanded.includes(node.value)
          ? expanded
          : [...expanded, node.value];

      setSearchCollapsed((prev) => {
        if (isOpen === prev.has(node.value)) return prev;
        const nextCollapsed = new Set(prev);
        if (isOpen) nextCollapsed.add(node.value);
        else nextCollapsed.delete(node.value);
        return nextCollapsed;
      });

      if (!isExpandControlled) setInternalExpanded(next);
      onExpand?.(next, node);
    },
    [expanded, expandedSet, isExpandControlled, onExpand]
  );

  return {
    nodeIndex,
    displayTree,
    expandedSet,
    flat,
    matched,
    toggleExpand,
  };
};
