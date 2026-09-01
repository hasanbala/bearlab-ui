import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { TreeNodeItem } from "./components/tree-node";
import { TreeSearch } from "./components/tree-search";
import { EmptyState } from "./components/empty-state";
import { IconErrorTriangle } from "./assets/icons";
import { useTreeState } from "./hooks/use-tree-state";
import {
  CheckInfo,
  NodeValue,
  SelectTreeProps,
  TreeMode,
  TreeNode,
  TreeProps,
} from "./types/tree.types";
import {
  computeCheckedAndIndeterminate,
  isLeaf,
  toggleChecked,
} from "./utils/tree-utils";
import {
  DEFAULT_EMPTY_TEXT,
  DEFAULT_NOT_FOUND_TEXT,
  DEFAULT_SEARCH_PLACEHOLDER,
} from "./constants/tree-config";
import styles from "./styles/tree.module.scss";

export const Tree = <Mode extends TreeMode = "single">(
  props: TreeProps<Mode>
) => {
  const {
    treeData,
    name,
    label,
    error,
    disabled,
    isRequired,
    showIcon = false,
    showLine = false,
    showSearch = false,
    highlightMatch = true,
    searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
    notFoundText = DEFAULT_NOT_FOUND_TEXT,
    emptyText = DEFAULT_EMPTY_TEXT,
    autoExpandParent = true,
    defaultExpandedValues,
    expandedValues,
    onExpand,
    style,
    className,
  } = props;

  const checkable = props.checkable === true;
  const checkStrictly = checkable ? props.checkStrictly === true : false;
  const mode: TreeMode = checkable
    ? "multiple"
    : ((props as SelectTreeProps<Mode>).mode ?? "single");

  const uid = useId();
  const treeId = `tree-${uid}`;
  const labelId = `tree-label-${uid}`;
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchQuery = showSearch ? query : "";
  const propValue = props.value;
  const propOnChange = props.onChange;

  const { nodeIndex, displayTree, expandedSet, flat, matched, toggleExpand } =
    useTreeState({
      treeData,
      query: searchQuery,
      defaultExpandedValues,
      expandedValues,
      autoExpandParent,
      onExpand,
    });

  const selectedValues = useMemo(() => {
    if (checkable) return new Set<NodeValue>();
    if (propValue == null) return new Set<NodeValue>();
    return new Set<NodeValue>(
      Array.isArray(propValue) ? propValue : [propValue]
    );
  }, [checkable, propValue]);

  const { checkedValues, indeterminateValues } = useMemo(() => {
    if (!checkable) {
      return {
        checkedValues: new Set<NodeValue>(),
        indeterminateValues: new Set<NodeValue>(),
      };
    }
    const value = (propValue as NodeValue[]) ?? [];
    if (checkStrictly) {
      return {
        checkedValues: new Set<NodeValue>(value),
        indeterminateValues: new Set<NodeValue>(),
      };
    }
    const { checked, indeterminate } = computeCheckedAndIndeterminate(
      treeData,
      value
    );
    return { checkedValues: checked, indeterminateValues: indeterminate };
  }, [checkable, checkStrictly, propValue, treeData]);

  const emit = useCallback(
    (nextValue: unknown, node?: TreeNode, info?: CheckInfo) => {
      const onChange = propOnChange as
        | ((value: unknown, node?: TreeNode, info?: CheckInfo) => void)
        | undefined;
      if (!onChange) return;
      if (name) {
        const syntheticEvent = {
          target: { name, value: nextValue, type: "tree" },
          currentTarget: { name, value: nextValue, type: "tree" },
        } as unknown as React.ChangeEvent<HTMLElement>;
        (
          onChange as unknown as (event: React.ChangeEvent<HTMLElement>) => void
        )(syntheticEvent);
      } else {
        onChange(nextValue, node, info);
      }
    },
    [name, propOnChange]
  );

  const handleSelect = useCallback(
    (node: TreeNode) => {
      if (node.disabled || disabled) return;
      if (mode === "single") {
        const isSame = propValue === node.value;
        emit(isSame ? null : node.value, node);
      } else {
        const arr = Array.isArray(propValue) ? (propValue as NodeValue[]) : [];
        const exists = arr.includes(node.value);
        const next = exists
          ? arr.filter((v) => v !== node.value)
          : [...arr, node.value];
        emit(next, node);
      }
    },
    [disabled, mode, propValue, emit]
  );

  const handleCheck = useCallback(
    (node: TreeNode) => {
      if (node.disabled || disabled) return;
      const next = toggleChecked(treeData, checkedValues, node, checkStrictly);
      const derived = checkStrictly
        ? {
            checked: new Set<NodeValue>(next),
            indeterminate: new Set<NodeValue>(),
          }
        : computeCheckedAndIndeterminate(treeData, next);
      const info: CheckInfo = {
        checked: derived.checked.has(node.value),
        node,
        checkedValues: next,
        halfCheckedValues: Array.from(derived.indeterminate),
      };
      emit(next, node, info);
    },
    [disabled, treeData, checkedValues, checkStrictly, emit]
  );

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  useEffect(() => {
    setActiveIndex((prev) => (prev >= flat.length ? flat.length - 1 : prev));
  }, [flat.length]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const current = flat[activeIndex];
    if (!current) return;
    const el = listRef.current?.querySelector(
      `[data-value="${CSS.escape(String(current.node.value))}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, flat]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const current = activeIndex >= 0 ? flat[activeIndex] : undefined;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < flat.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : flat.length - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          if (!current) {
            setActiveIndex(0);
          } else if (
            !isLeaf(current.node) &&
            !expandedSet.has(current.node.value)
          ) {
            toggleExpand(current.node);
          } else {
            setActiveIndex((prev) => Math.min(prev + 1, flat.length - 1));
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (!current) break;
          if (!isLeaf(current.node) && expandedSet.has(current.node.value)) {
            toggleExpand(current.node);
          } else {
            const parent = nodeIndex.parentOf.get(current.node.value);
            if (parent != null) {
              const idx = flat.findIndex((f) => f.node.value === parent);
              if (idx >= 0) setActiveIndex(idx);
            }
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (!current) break;
          if (checkable) handleCheck(current.node);
          else handleSelect(current.node);
          break;
        case "Escape":
          setActiveIndex(-1);
          break;
      }
    },
    [
      disabled,
      flat,
      activeIndex,
      expandedSet,
      nodeIndex,
      checkable,
      toggleExpand,
      handleCheck,
      handleSelect,
    ]
  );

  const activeValue =
    activeIndex >= 0 && flat[activeIndex]
      ? flat[activeIndex].node.value
      : undefined;
  const activeDescendant =
    activeValue !== undefined ? `${treeId}-node-${activeValue}` : undefined;

  const hasData = treeData.length > 0;
  const hasResults = displayTree.length > 0;

  return (
    <div
      style={style?.root}
      className={classNames(
        styles.container,
        disabled && styles.disabled,
        className?.root
      )}
    >
      {label && (
        <div id={labelId} className={styles.treeLabel}>
          {label} {isRequired && <span aria-hidden="true">*</span>}
        </div>
      )}
      {showSearch && (
        <TreeSearch
          query={query}
          disabled={disabled}
          placeholder={searchPlaceholder}
          style={style}
          className={className}
          setQuery={setQuery}
        />
      )}
      <div
        id={treeId}
        ref={listRef}
        role="tree"
        tabIndex={disabled ? -1 : 0}
        aria-multiselectable={mode === "multiple"}
        aria-labelledby={label ? labelId : undefined}
        aria-activedescendant={activeDescendant}
        style={style?.tree}
        className={classNames(
          styles.tree,
          (!hasData || !hasResults) && styles.treeEmpty,
          className?.tree
        )}
        onKeyDown={handleKeyDown}
      >
        {!hasData ? (
          <EmptyState message={emptyText} />
        ) : !hasResults ? (
          <EmptyState message={notFoundText} />
        ) : (
          displayTree.map((node) => (
            <TreeNodeItem
              key={node.value}
              node={node}
              depth={0}
              treeId={treeId}
              showIcon={showIcon}
              showLine={showLine}
              checkable={checkable}
              disabled={disabled}
              query={searchQuery}
              highlightMatch={highlightMatch}
              activeValue={activeValue}
              matchedValues={matched}
              selectedValues={selectedValues}
              checkedValues={checkedValues}
              indeterminateValues={indeterminateValues}
              expandedValues={expandedSet}
              style={style}
              className={className}
              onToggleExpand={toggleExpand}
              onSelect={handleSelect}
              onCheck={handleCheck}
            />
          ))
        )}
      </div>
      {error && (
        <div className={styles.viewError}>
          <IconErrorTriangle />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
