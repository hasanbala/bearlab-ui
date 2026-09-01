import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { Search } from "./components/search";
import { TreeOptions } from "./components/tree-options";
import { OptionsPortal } from "./components/options-portal";
import { IconErrorTriangle } from "./assets/icons";
import { useClickOutside } from "./hooks/use-click-outside";
import {
  NodeValue,
  TreeSelectMode,
  TreeSelectOption,
  TreeSelectProps,
} from "./types/tree-select.types";
import {
  buildNodeIndex,
  computeCheckedAndIndeterminate,
  filterTree,
  flattenVisibleNodes,
  getDisplayTagValues,
  isLeaf,
  resolveValueTree,
  toggleChecked,
} from "./utils/tree-select-utils";
import styles from "./styles/tree-select.module.scss";

export const TreeSelect = <Mode extends TreeSelectMode = "single">(
  props: TreeSelectProps<Mode>
) => {
  const {
    name,
    value,
    label,
    error,
    style,
    treeData,
    disabled,
    className,
    isRequired,
    showIcon = false,
    showLine = false,
    optionZIndex = 8888,
    checkStrictly = false,
    highlightMatch = true,
    placeholder = "Select...",
    notFoundText = "No result found",
    emptyText = "There is no options",
    isLoading = false,
    autoExpandParent = true,
    defaultExpandedValues,
    expandedValues,
    onExpand,
    onChange,
  } = props;

  const mode: TreeSelectMode = props.mode ?? "single";
  const isSingle = mode === "single";
  const isMultiple = mode === "multiple";

  const uid = useId();
  const portalRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputId = `tree-select-input-${uid}`;
  const listboxId = `tree-select-listbox-${uid}`;
  const treeId = `tree-select-${uid}`;
  const labelId = `tree-select-label-${uid}`;

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
    setActiveIndex(-1);
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

  useEffect(() => {
    setActiveIndex((prev) => (prev >= flat.length ? flat.length - 1 : prev));
  }, [flat.length]);

  const toggleExpand = useCallback(
    (node: TreeSelectOption) => {
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

  const selectedValues = useMemo(() => {
    if (isMultiple) return new Set<NodeValue>();
    return value == null
      ? new Set<NodeValue>()
      : new Set<NodeValue>([value as NodeValue]);
  }, [isMultiple, value]);

  const { checkedValues, indeterminateValues } = useMemo(() => {
    if (!isMultiple) {
      return {
        checkedValues: new Set<NodeValue>(),
        indeterminateValues: new Set<NodeValue>(),
      };
    }
    const arr = (value as NodeValue[]) ?? [];
    if (checkStrictly) {
      return {
        checkedValues: new Set<NodeValue>(arr),
        indeterminateValues: new Set<NodeValue>(),
      };
    }
    const { checked, indeterminate } = computeCheckedAndIndeterminate(
      treeData,
      arr
    );
    return { checkedValues: checked, indeterminateValues: indeterminate };
  }, [isMultiple, checkStrictly, value, treeData]);

  const selectedItems = useMemo<TreeSelectOption[]>(() => {
    if (isMultiple) {
      const tagValues = getDisplayTagValues(
        (value as NodeValue[]) ?? [],
        nodeIndex
      );
      return resolveValueTree(tagValues, nodeIndex);
    }
    return resolveValueTree(value as NodeValue | null, nodeIndex);
  }, [isMultiple, value, nodeIndex]);

  const handleClose = useCallback(() => {
    setIsDropdownVisible(false);
    setActiveIndex(-1);
    setQuery("");
  }, []);

  const { containerRef } = useClickOutside(
    handleClose,
    setContainerWidth,
    portalRef
  );

  const fireOnChange = useCallback(
    (nextValue: unknown, node?: TreeSelectOption | null) => {
      if (!onChange) return;
      if (name) {
        const syntheticEvent = {
          target: { name, value: nextValue, type: "tree-select" },
          currentTarget: { name, value: nextValue, type: "tree-select" },
        } as unknown as React.ChangeEvent<HTMLElement>;
        (
          onChange as unknown as (event: React.ChangeEvent<HTMLElement>) => void
        )(syntheticEvent);
      } else {
        (
          onChange as unknown as (
            value: unknown,
            node?: TreeSelectOption
          ) => void
        )(nextValue, node as TreeSelectOption);
      }
    },
    [onChange, name]
  );

  const handleSelect = useCallback(
    (node: TreeSelectOption) => {
      if (node.disabled || disabled) return;
      const isSame = (value as NodeValue | null) === node.value;
      fireOnChange(isSame ? null : node.value, node);
      handleClose();
    },
    [disabled, value, fireOnChange, handleClose]
  );

  const handleCheck = useCallback(
    (node: TreeSelectOption) => {
      if (node.disabled || disabled) return;
      const next = toggleChecked(treeData, checkedValues, node, checkStrictly);
      fireOnChange(next, node);
    },
    [disabled, treeData, checkedValues, checkStrictly, fireOnChange]
  );

  const handleActivate = useCallback(
    (node: TreeSelectOption) => {
      if (isMultiple) handleCheck(node);
      else handleSelect(node);
    },
    [isMultiple, handleCheck, handleSelect]
  );

  const handleRemove = useCallback(
    (updated: TreeSelectOption[]) => {
      if (isSingle) {
        fireOnChange(null, null);
        return;
      }
      const updatedSet = new Set(updated.map((i) => i.value));
      const removed = selectedItems.filter((i) => !updatedSet.has(i.value));
      if (removed.length === 0) return;

      let nextChecked = checkedValues;
      let nextValue: NodeValue[] = (value as NodeValue[]) ?? [];
      for (const node of removed) {
        nextValue = toggleChecked(treeData, nextChecked, node, checkStrictly);
        nextChecked = checkStrictly
          ? new Set(nextValue)
          : computeCheckedAndIndeterminate(treeData, nextValue).checked;
      }
      fireOnChange(nextValue, null);
    },
    [
      isSingle,
      selectedItems,
      checkedValues,
      value,
      treeData,
      checkStrictly,
      fireOnChange,
    ]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isLoading || disabled) return;
      if (!isDropdownVisible) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          e.preventDefault();
          setIsDropdownVisible(true);
        }
        return;
      }
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
          e.preventDefault();
          if (current) handleActivate(current.node);
          break;
        case "Escape":
          e.preventDefault();
          setIsDropdownVisible(false);
          setActiveIndex(-1);
          break;
        case "Backspace":
          if (!query && selectedItems.length > 0) {
            handleRemove(selectedItems.slice(0, -1));
          }
          break;
      }
    },
    [
      query,
      disabled,
      isLoading,
      activeIndex,
      flat,
      expandedSet,
      nodeIndex,
      selectedItems,
      isDropdownVisible,
      toggleExpand,
      handleActivate,
      handleRemove,
    ]
  );

  const activeValue =
    activeIndex >= 0 && flat[activeIndex]
      ? flat[activeIndex].node.value
      : undefined;
  const activeOptionId =
    activeValue !== undefined ? `${treeId}-node-${activeValue}` : undefined;

  return (
    <div
      ref={containerRef}
      style={style?.root}
      className={classNames(
        styles.container,
        disabled && styles.disabled,
        className?.root
      )}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className={styles.selectLabel}
          onClick={(e) => e.stopPropagation()}
        >
          {label} {isRequired && <span aria-hidden="true">*</span>}
        </label>
      )}
      <Search
        mode={mode}
        error={error}
        query={query}
        style={style}
        inputId={inputId}
        disabled={disabled}
        isLoading={isLoading}
        listboxId={listboxId}
        className={className}
        placeholder={placeholder}
        selectedItems={selectedItems}
        containerWidth={containerWidth}
        activeOptionId={activeOptionId}
        isDropdownVisible={isDropdownVisible}
        setQuery={setQuery}
        onChange={handleRemove}
        onKeyDown={handleKeyDown}
        setIsDropdownVisible={setIsDropdownVisible}
      />
      <OptionsPortal
        ref={portalRef}
        anchorRef={containerRef}
        isVisible={isDropdownVisible}
        optionZIndex={optionZIndex}
      >
        <TreeOptions
          treeId={treeId}
          mode={mode}
          query={query}
          style={style}
          disabled={disabled}
          isLoading={isLoading}
          showIcon={showIcon}
          showLine={showLine}
          listboxId={listboxId}
          emptyText={emptyText}
          treeData={displayTree}
          className={className}
          notFoundText={notFoundText}
          activeValue={activeValue}
          highlightMatch={highlightMatch}
          matchedValues={matched}
          selectedValues={selectedValues}
          checkedValues={checkedValues}
          indeterminateValues={indeterminateValues}
          expandedValues={expandedSet}
          onToggleExpand={toggleExpand}
          onSelect={handleActivate}
        />
      </OptionsPortal>
      {error && (
        <div className={styles.viewError}>
          <IconErrorTriangle />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
